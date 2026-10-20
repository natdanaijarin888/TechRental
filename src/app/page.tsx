import React from "react";
import Link from "next/link";
import { Laptop, ShieldCheck, Zap, RefreshCw, Calendar, ArrowRight, CheckCircle, Cpu, Camera, Monitor } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatTHB } from "@/lib/utils";
import HomeRentalCalculator from "@/components/HomeRentalCalculator";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      assets: {
        where: { status: "AVAILABLE" },
      },
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-md animate-in fade-in">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            ระบบเช่าอุปกรณ์ IT ระดับมืออาชีพ ติดตาม Serial Number ทุกชิ้น
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            เช่าอุปกรณ์ไอทีสเปกท็อป <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              พร้อมใช้งานทันที ไม่มีสะดุด
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            MacBook Pro M3 Max, การ์ดจอ RTX 4090, จอ OLED 4K, กล้อง Sony Full-Frame สำหรับงานตัดต่อ 3D อีเวนต์ และโปรเจกต์ด่วน ตรวจเช็คสภาพเครื่องก่อนและหลังส่งมอบ มั่นใจ ปลอดภัย
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/catalog"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition flex items-center gap-2 group"
            >
              ค้นหาและจองอุปกรณ์
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              href="/profile/kyc"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-sm backdrop-blur-md transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ยืนยันตัวตน KYC
            </Link>
          </div>

          {/* Quick trust highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="text-xs font-bold text-white">ยืนยันข้อมูลผู้เช่า</p>
              <p className="text-[11px] text-slate-400">ข้อมูลจัดส่ง & ติดต่อฉุกเฉิน</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-xs font-bold text-white">ระบบกันจองชนกัน</p>
              <p className="text-[11px] text-slate-400">Overlap Prevention Engine</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <RefreshCw className="w-5 h-5 text-purple-400 mb-2" />
              <p className="text-xs font-bold text-white">ตรวจสภาพ 2 ขั้นตอน</p>
              <p className="text-[11px] text-slate-400">Check-out & Check-in Photo</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-amber-400 mb-2" />
              <p className="text-xs font-bold text-white">คืนเงินมัดจำไว</p>
              <p className="text-[11px] text-slate-400">คำนวณหักค่าปรับอัตโนมัติ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Pricing Estimator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <HomeRentalCalculator />
      </section>

      {/* Featured Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              อุปกรณ์แนะนำยอดนิยม
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              อุปกรณ์สเปกท็อป พร้อมให้เช่าทันที
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            ดูทั้งหมด ({featuredProducts.length}+ เครื่อง)
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => {
            const availableCount = product.assets.length;
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                      {product.category.name}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                        availableCount > 0
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {availableCount > 0 ? `ว่าง ${availableCount} เครื่อง` : "คิวเต็ม"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                      {product.brand} • {product.model}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400">ค่าเช่าเริ่มต้น</div>
                      <div className="text-lg font-black text-gray-900">
                        {formatTHB(product.dailyRate)}{" "}
                        <span className="text-xs font-normal text-gray-500">/วัน</span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        มัดจำ {formatTHB(product.depositAmount)}
                      </div>
                    </div>

                    <Link
                      href={`/catalog/${product.id}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition shadow-sm"
                    >
                      ดูรายละเอียด & คิวว่าง
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
