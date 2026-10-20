"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatTHB } from "@/lib/utils";

interface ProductOption {
  id: string;
  name: string;
  brand: string;
  category: string;
  dailyRate: number;
  weeklyRate: number;
  depositAmount: number;
}

const DEFAULT_PRODUCTS: ProductOption[] = [
  {
    id: "prod-mbp-m3max",
    name: "Apple MacBook Pro 16\" (M3 Max 64GB)",
    brand: "Apple",
    category: "โน้ตบุ๊ก",
    dailyRate: 1500,
    weeklyRate: 8500,
    depositAmount: 15000,
  },
  {
    id: "prod-rtx-4090",
    name: "ASUS ROG Strix RTX 4090 24GB OC",
    brand: "ASUS",
    category: "การ์ดจอ GPU",
    dailyRate: 1600,
    weeklyRate: 9000,
    depositAmount: 25000,
  },
  {
    id: "prod-sony-a7iv",
    name: "Sony Alpha 7 IV + FE 24-70mm GM II",
    brand: "Sony",
    category: "กล้องและเลนส์",
    dailyRate: 1800,
    weeklyRate: 9800,
    depositAmount: 18000,
  },
  {
    id: "prod-dell-xps16",
    name: "Dell XPS 16 (Core Ultra 9 / RTX 4070)",
    brand: "Dell",
    category: "โน้ตบุ๊ก",
    dailyRate: 1300,
    weeklyRate: 7500,
    depositAmount: 12000,
  },
  {
    id: "prod-monitor-oled",
    name: "LG UltraFine 32\" 4K OLED Pro Display",
    brand: "LG",
    category: "จอมอนิเตอร์",
    dailyRate: 1200,
    weeklyRate: 6500,
    depositAmount: 15000,
  },
  {
    id: "prod-ipad-m4",
    name: "Apple iPad Pro 13\" (M4) + Pencil Pro",
    brand: "Apple",
    category: "แท็บเล็ต",
    dailyRate: 900,
    weeklyRate: 4900,
    depositAmount: 10000,
  },
];

export default function HomeRentalCalculator() {
  const [selectedId, setSelectedId] = useState(DEFAULT_PRODUCTS[0].id);
  const [days, setDays] = useState(3);

  const product = DEFAULT_PRODUCTS.find((p) => p.id === selectedId) || DEFAULT_PRODUCTS[0];

  // Pricing calculation
  const baseRent = product.dailyRate * days;
  let discount = 0;
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainder = days % 7;
    const weeklyPrice = weeks * product.weeklyRate + remainder * product.dailyRate;
    if (weeklyPrice < baseRent) {
      discount = baseRent - weeklyPrice;
    }
  }

  const rentTotal = baseRent - discount;
  const grandTotal = rentTotal + product.depositAmount;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-1">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            คำนวณราคาเช่าอุปกรณ์ด่วน (Instant Pricing Estimator)
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            ประเมินค่าเช่าและเงินมัดจำทันที
          </h3>
        </div>
        <p className="text-xs text-slate-400 max-w-xs">
          เลือกอุปกรณ์และกำหนดจำนวนวัน เพื่อดูยอดรวมค่าเช่าและเงินมัดจำที่จะได้รับคืน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Select Product */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              เลือกอุปกรณ์ที่ต้องการประเมินราคา
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEFAULT_PRODUCTS.map((p) => {
                const isSelected = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      isSelected
                        ? "bg-blue-600/30 border-blue-400 text-white ring-1 ring-blue-400"
                        : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-[10px] text-blue-300 font-semibold block">
                      {p.brand} • {p.category}
                    </span>
                    <span className="font-bold text-xs text-white block truncate">{p.name}</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {formatTHB(p.dailyRate)} /วัน
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Days slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300">ระยะเวลาการเช่า:</span>
              <span className="text-base text-cyan-400 font-black">{days} วัน</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
              <span>1 วัน</span>
              <span>7 วัน (ส่วนลดสัปดาห์)</span>
              <span>14 วัน</span>
              <span>30 วัน (1 เดือน)</span>
            </div>
          </div>
        </div>

        {/* Right column: Result card */}
        <div className="lg:col-span-5 bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            สรุปการประเมินราคา ({days} วัน)
          </h4>

          <div className="space-y-2 text-xs divide-y divide-slate-700/60">
            <div className="flex justify-between py-1.5 text-slate-300">
              <span>
                ค่าเช่า ({formatTHB(product.dailyRate)} × {days} วัน):
              </span>
              <span className="font-semibold text-white">{formatTHB(baseRent)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between py-1.5 text-emerald-400 font-semibold">
                <span>ส่วนลดแพ็กเกจรายสัปดาห์:</span>
                <span>-{formatTHB(discount)}</span>
              </div>
            )}

            <div className="flex justify-between py-1.5 text-slate-300">
              <span>ค่าเช่าสุทธิ:</span>
              <span className="font-bold text-white">{formatTHB(rentTotal)}</span>
            </div>

            <div className="flex justify-between py-1.5 text-amber-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                เงินประกันมัดจำ (โอนคืนหลังใช้งาน):
              </span>
              <span className="font-bold">{formatTHB(product.depositAmount)}</span>
            </div>

            <div className="flex justify-between pt-3 text-base">
              <span className="font-black text-white">ยอดชำระวันรับเครื่อง:</span>
              <span className="font-black text-2xl text-cyan-400">{formatTHB(grandTotal)}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/booking/${product.id}`}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 group"
            >
              จองรุ่นนี้ทันที
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              * ได้เงินมัดจำคืนเต็มจำนวน ฿{product.depositAmount.toLocaleString()} หลังส่งคืนเครื่อง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
