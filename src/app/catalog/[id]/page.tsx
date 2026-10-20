"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Package,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Info,
  Sparkles,
  Zap,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Selected date range on the calendar
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSelectRange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleProceedToBooking = () => {
    const query = new URLSearchParams();
    if (startDate) query.set("start", startDate.toISOString().split("T")[0]);
    if (endDate) query.set("end", endDate.toISOString().split("T")[0]);
    router.push(`/booking/${productId}?${query.toString()}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">กำลังโหลดรายละเอียดอุปกรณ์...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">ไม่พบข้อมูลอุปกรณ์นี้</h2>
        <Link
          href="/catalog"
          className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:underline"
        >
          ← กลับสู่หน้ารวมแคตตาล็อก
        </Link>
      </div>
    );
  }

  const specsList = product.specsObj ? Object.entries(product.specsObj) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่แคตตาล็อกอุปกรณ์
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left column: Images & Detailed Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Product Image */}
          <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            <div className="relative h-80 sm:h-96 w-full bg-gray-50">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-gray-900 shadow-sm">
                  {product.category?.name}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                    product.availableAssetsCount > 0
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.availableAssetsCount > 0
                    ? `มีเครื่องว่าง ${product.availableAssetsCount} เครื่อง`
                    : "คิวเต็มชั่วคราว"}
                </span>
              </div>
            </div>
          </div>

          {/* Product Header & Description */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {product.brand} • {product.model}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                {product.name}
              </h1>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Full Technical Specifications */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              สเปกทางเทคนิคอย่างละเอียด (Specifications)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {specsList.map(([key, val]: [string, any]) => (
                <div
                  key={key}
                  className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {key}
                  </span>
                  <span className="text-xs font-semibold text-gray-900 mt-0.5">
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories Included */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-600" />
              อุปกรณ์เสริมที่มาในชุด (Accessories Included)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {(product.accessoriesArr || []).map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs font-medium text-emerald-950"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Calendar */}
          <div>
            <AvailabilityCalendar
              productId={productId}
              startDate={startDate}
              endDate={endDate}
              onSelectRange={handleSelectRange}
            />
          </div>
        </div>

        {/* Right column: Sticky Pricing & Booking Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-medium text-gray-400">อัตราค่าบริการเช่า</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-gray-900">
                    {formatTHB(product.dailyRate)}
                  </span>
                  <span className="text-xs font-medium text-gray-500">/ วัน</span>
                </div>
                {product.weeklyRate && (
                  <div className="mt-1 text-xs text-blue-600 font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    ประหยัดเมื่อเช่า 7 วัน: {formatTHB(product.weeklyRate)} / สัปดาห์
                  </div>
                )}
              </div>

              {/* Security Deposit Badge */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-900">
                  <span>วงเงินประกัน / มัดจำ (Deposit):</span>
                  <span>{formatTHB(product.depositAmount)}</span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  * คืนเงินมัดจำเต็มจำนวนโอนกลับเข้าบัญชีทันทีหลังตรวจรับเครื่องคืนเรียบร้อย
                </p>
              </div>

              {/* Selected Dates Display */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span>ช่วงวันที่เลือกจากปฏิทิน:</span>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">เริ่มต้น</span>
                    <span className="font-bold text-gray-900">
                      {startDate ? startDate.toLocaleDateString("th-TH") : "คลิกเลือกบนปฏิทิน"}
                    </span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">สิ้นสุด</span>
                    <span className="font-bold text-gray-900">
                      {endDate ? endDate.toLocaleDateString("th-TH") : "คลิกเลือกบนปฏิทิน"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Booking Button */}
              <button
                type="button"
                onClick={handleProceedToBooking}
                disabled={product.availableAssetsCount === 0}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-black shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                {startDate && endDate
                  ? "ไปที่หน้าชำระเงินและสรุปสัญญา"
                  : "ทำการจองอุปกรณ์นี้"}
              </button>

              <div className="space-y-2 pt-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>ระบบตรวจสอบคิวว่างอัตโนมัติ (ไม่ชนคิว)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>รับสิทธิประกันตัวเครื่องและสายชาร์จแท้</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>ใบเสร็จรับเงิน/ใบกำกับภาษีอิเล็กทรอนิกส์</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
