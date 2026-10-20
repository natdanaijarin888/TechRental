"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, isWithinInterval, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { th } from "date-fns/locale";

interface DayAvailability {
  date: string;
  totalUnits: number;
  bookedUnits: number;
  availableUnits: number;
  status: "AVAILABLE" | "LIMITED" | "OUT_OF_STOCK";
}

interface AvailabilityCalendarProps {
  productId: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onSelectRange?: (start: Date | null, end: Date | null) => void;
  interactive?: boolean;
}

export default function AvailabilityCalendar({
  productId,
  startDate,
  endDate,
  onSelectRange,
  interactive = true,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Record<string, DayAvailability>>({});
  const [loading, setLoading] = useState(false);

  const fetchMonthData = async (date: Date) => {
    setLoading(true);
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const res = await fetch(`/api/products/${productId}/availability?year=${year}&month=${month}`);
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, DayAvailability> = {};
        (data.calendarData || []).forEach((item: DayAvailability) => {
          map[item.date] = item;
        });
        setCalendarData(map);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthData(currentMonth);
  }, [productId, currentMonth]);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayIndex = getDay(monthStart); // 0 = Sunday

  const handleDateClick = (day: Date, dayInfo?: DayAvailability) => {
    if (!interactive || !onSelectRange) return;
    if (dayInfo && dayInfo.status === "OUT_OF_STOCK") return;

    if (!startDate || (startDate && endDate)) {
      onSelectRange(day, null);
    } else if (startDate && !endDate) {
      if (day < startDate) {
        onSelectRange(day, null);
      } else {
        onSelectRange(startDate, day);
      }
    }
  };

  const weekDayNames = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">
            ปฏิทินตรวจสอบคิวว่าง (Availability Calendar)
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
            title="เดือนก่อนหน้า"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs sm:text-sm font-semibold text-gray-800 min-w-[120px] text-center">
            {format(currentMonth, "MMMM yyyy", { locale: th })}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
            title="เดือนถัดไป"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {weekDayNames.map((name, i) => (
          <div
            key={name}
            className={`text-xs font-semibold py-1 ${
              i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty slots before start of month */}
        {Array.from({ length: startingDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[52px] rounded-lg bg-gray-50/50" />
        ))}

        {daysInMonth.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const info = calendarData[dateStr];
          const isToday = isSameDay(day, new Date());
          const isStart = startDate ? isSameDay(day, startDate) : false;
          const isEnd = endDate ? isSameDay(day, endDate) : false;
          const isInRange =
            startDate && endDate
              ? isWithinInterval(day, { start: startDate, end: endDate })
              : false;

          const isOutOfStock = info?.status === "OUT_OF_STOCK";
          const isLimited = info?.status === "LIMITED";

          let cellClass = "hover:bg-blue-50 border-gray-100 text-gray-700";
          if (isInRange) {
            cellClass = "bg-blue-100 border-blue-200 text-blue-900";
          }
          if (isStart || isEnd) {
            cellClass = "bg-blue-600 border-blue-600 text-white font-bold shadow-sm";
          }
          if (isOutOfStock) {
            cellClass = "bg-red-50/60 border-red-100 text-red-400 cursor-not-allowed";
          }

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => handleDateClick(day, info)}
              disabled={!interactive || isOutOfStock}
              className={`min-h-[52px] p-1 rounded-xl border text-left transition flex flex-col justify-between relative ${cellClass} ${
                isToday ? "ring-2 ring-blue-400 ring-offset-1" : ""
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-semibold ${isStart || isEnd ? "text-white" : ""}`}>
                  {format(day, "d")}
                </span>
                {isToday && (
                  <span className={`text-[8px] font-bold px-1 rounded ${
                    isStart || isEnd ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"
                  }`}>
                    วันนี้
                  </span>
                )}
              </div>

              {info && (
                <div className="mt-1 flex items-center justify-between text-[10px] w-full">
                  <span
                    className={`text-[9px] px-1 py-0.5 rounded font-medium truncate ${
                      isStart || isEnd
                        ? "bg-white/20 text-white"
                        : isOutOfStock
                        ? "text-red-600 bg-red-100"
                        : isLimited
                        ? "text-amber-700 bg-amber-100"
                        : "text-emerald-700 bg-emerald-100"
                    }`}
                  >
                    {isOutOfStock ? "เต็ม" : `ว่าง ${info.availableUnits}`}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-[11px] text-gray-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> ว่างพร้อมเช่า
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> เหลือน้อย
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> คิวเต็ม (ไม่ว่าง)
          </span>
        </div>
        <p className="text-[10px] text-gray-400">
          * คลิกเลือกวันที่เริ่มต้นและสิ้นสุดบนปฏิทินเพื่อจอง
        </p>
      </div>
    </div>
  );
}
