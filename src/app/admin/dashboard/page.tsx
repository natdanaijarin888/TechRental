"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  Package,
  Layers,
  Clock,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">กำลังคำนวณข้อมูลแดชบอร์ดภาพรวม...</p>
      </div>
    );
  }

  const m = stats?.metrics || {};

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Management & Reporting
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">แดชบอร์ดสรุปผลภาพรวม</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            รายงานรายได้ สถานะทรัพย์สิน อุปกรณ์ที่ต้องส่งคืน และการประเมินความเสี่ยง
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          อัปเดตข้อมูล
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">ยอดรายได้รวม (ค่าเช่า)</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{formatTHB(m.totalRevenue || 0)}</div>
          <p className="text-[11px] text-gray-400">จากคำสั่งเช่าที่ยืนยันชำระเงินแล้ว</p>
        </div>

        {/* Deposit held */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">เงินมัดจำในระบบ (Escrow)</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700">
            {formatTHB(m.activeDepositsHeld || 0)}
          </div>
          <p className="text-[11px] text-gray-400">ถือครองระหว่างที่ลูกค้าใช้งานเครื่อง</p>
        </div>

        {/* Active Rentals */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">กำลังให้เช่า (Active)</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-600">{m.activeOrdersCount || 0} รายการ</div>
          <p className="text-[11px] text-gray-400">
            รอตรวจสอบ {m.pendingOrdersCount || 0} • เสร็จสิ้น {m.completedOrdersCount || 0}
          </p>
        </div>

        {/* Assets in Stock */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">คลังอุปกรณ์ (Serial Number)</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-700">
            {m.totalAssetsCount || 0} <span className="text-sm font-normal text-gray-500">เครื่อง</span>
          </div>
          <p className="text-[11px] text-gray-400">
            ว่าง {m.availableAssetsCount || 0} • เช่าอยู่ {m.rentedAssetsCount || 0} • ส่งซ่อม {m.maintenanceAssetsCount || 0}
          </p>
        </div>
      </div>

      {/* Due Soon & Overdue Risk Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Due Soon within 24-48 hours */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              อุปกรณ์ใกล้ครบกำหนดส่งคืน (Due Soon 24-48 ชม.)
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {stats?.dueSoonOrders?.length || 0} เครื่อง
            </span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {(!stats?.dueSoonOrders || stats.dueSoonOrders.length === 0) ? (
              <p className="py-6 text-center text-gray-400">ไม่มีอุปกรณ์ที่ครบกำหนดในระยะ 2 วันนี้</p>
            ) : (
              stats.dueSoonOrders.map((o: any) => (
                <div key={o.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-mono font-bold text-gray-900">{o.orderNumber}</span>
                    <h4 className="font-semibold text-gray-800 mt-0.5">{o.product.name}</h4>
                    <p className="text-[11px] text-gray-500">
                      ผู้เช่า: {o.customer.name} ({o.customer.phone || "-"}) • S/N: {o.assignedAsset?.serialNumber || "-"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-amber-700 font-bold block">
                      กำหนดคืน: {new Date(o.endDate).toLocaleDateString("th-TH")}
                    </span>
                    <Link
                      href={`/admin/inspections`}
                      className="mt-1 inline-block text-[11px] text-blue-600 hover:underline font-semibold"
                    >
                      เตรียมตรวจรับคืน →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Overdue Items / Risk Alert */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              รายงานส่งคืนล่าช้าเกินกำหนด (Overdue / Risk Alert)
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {stats?.overdueOrders?.length || 0} เครื่อง
            </span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {(!stats?.overdueOrders || stats.overdueOrders.length === 0) ? (
              <div className="py-6 text-center text-gray-400 space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                <p>ไม่พบรายการคืนล่าช้าเกินกำหนดในระบบ</p>
              </div>
            ) : (
              stats.overdueOrders.map((o: any) => (
                <div key={o.id} className="py-3 flex items-center justify-between gap-3 bg-rose-50/50 p-2 rounded-xl">
                  <div>
                    <span className="font-mono font-bold text-rose-900">{o.orderNumber}</span>
                    <h4 className="font-semibold text-gray-800 mt-0.5">{o.product.name}</h4>
                    <p className="text-[11px] text-gray-500">
                      ผู้เช่า: {o.customer.name} (โทร {o.customer.phone || "-"}) • S/N: {o.assignedAsset?.serialNumber || "-"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-rose-600 font-black block">
                      เลยกำหนดส่งคืน!
                    </span>
                    <Link
                      href={`/admin/inspections`}
                      className="mt-1 inline-block text-[11px] text-rose-700 hover:underline font-bold"
                    >
                      ตรวจรับและคำนวณค่าปรับ →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top 5 Most Rented Products */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          5 อันดับอุปกรณ์ที่ถูกเช่าบ่อยที่สุด (Top Rented Equipment)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(stats?.topProducts || []).map((p: any, idx: number) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                #{idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-gray-900 truncate">{p.name}</h4>
                <p className="text-[11px] text-gray-500">
                  หมวดหมู่: {p.category} • {formatTHB(p.dailyRate)}/วัน
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-blue-600 block">
                  {p.rentCount} ครั้ง
                </span>
                <span className="text-[10px] text-gray-400">คำสั่งเช่า</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
