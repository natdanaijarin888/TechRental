"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  ShieldCheck,
  Laptop,
  CheckCircle2,
  Calendar,
  CreditCard,
  FileCheck,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";

export default function OrderReceiptPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">กำลังเตรียมเอกสารใบเสร็จ...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">ไม่พบคำสั่งเช่านี้</h2>
        <Link href="/orders" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
          ← กลับสู่รายการคำสั่งเช่า
        </Link>
      </div>
    );
  }

  const startDate = new Date(order.startDate).toLocaleDateString("th-TH");
  const endDate = new Date(order.endDate).toLocaleDateString("th-TH");
  const inspection = order.inspection;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Top action bar (hidden on print) */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่รายการคำสั่งเช่า
        </Link>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          พิมพ์ใบเสร็จ / บันทึกเป็น PDF
        </button>
      </div>

      {/* Printable Receipt Document */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm print:border-none print:shadow-none print:p-0 space-y-8">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900">
                Tech<span className="text-blue-600">Rent</span> Hub Co., Ltd.
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              บริษัท เทคเรนท์ ฮับ จำกัด (สำนักงานใหญ่)<br />
              เลขประจำตัวผู้เสียภาษี: 0-1055-69001-22-3<br />
              88/1 อาคารไอทีเซ็นเตอร์ ชั้น 5 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110<br />
              โทร: 02-999-8888 | อีเมล: support@techrent.co
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 block">
              RECEIPT / INVOICE
            </span>
            <h2 className="text-xl font-bold text-gray-900">ใบเสร็จรับเงิน / สัญญาเช่า</h2>
            <p className="text-xs font-mono font-bold text-gray-700">
              เลขที่: {order.orderNumber}
            </p>
            <p className="text-xs text-gray-500">
              วันที่ออกเอกสาร: {new Date(order.createdAt).toLocaleDateString("th-TH")}
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ชำระเงินแล้ว ({order.paymentStatus})
              </span>
            </div>
          </div>
        </div>

        {/* Customer Info & Rental Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <span className="font-bold text-gray-900 block mb-1 text-sm">
              ข้อมูลผู้เช่า (Customer Details)
            </span>
            <p className="font-semibold text-gray-800">{order.customer.name}</p>
            <p className="text-gray-600">โทร: {order.customer.phone || "-"}</p>
            <p className="text-gray-600">อีเมล: {order.customer.email}</p>
            <p className="text-gray-600">
              สถานที่จัดส่ง/รับเครื่อง: {order.deliveryAddress || "-"}
            </p>
            <div className="pt-1 flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              ยืนยันตัวตน KYC: {order.customer.kycStatus}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <span className="font-bold text-gray-900 block mb-1 text-sm">
              กำหนดระยะเวลาการเช่า (Rental Period)
            </span>
            <div className="flex justify-between py-0.5 text-gray-700">
              <span>วันที่เริ่มต้น:</span>
              <span className="font-bold">{startDate}</span>
            </div>
            <div className="flex justify-between py-0.5 text-gray-700">
              <span>วันที่ส่งคืนตามกำหนด:</span>
              <span className="font-bold">{endDate}</span>
            </div>
            <div className="flex justify-between py-0.5 text-gray-700">
              <span>จำนวนวันเช่ารวม:</span>
              <span className="font-black text-blue-600">{order.totalDays} วัน</span>
            </div>
            <div className="flex justify-between py-0.5 text-gray-700">
              <span>หมายเลขอ้างอิงชำระเงิน:</span>
              <span className="font-mono text-gray-600">{order.paymentReference || "-"}</span>
            </div>
          </div>
        </div>

        {/* Equipment & Serial Number table */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
          <div className="bg-gray-100 p-3 font-bold text-gray-800 grid grid-cols-12 gap-2">
            <div className="col-span-6">รายการอุปกรณ์และอุปกรณ์เสริม</div>
            <div className="col-span-2 text-center">Serial Number</div>
            <div className="col-span-2 text-right">เรต/วัน</div>
            <div className="col-span-2 text-right">จำนวนเงิน</div>
          </div>

          <div className="p-4 divide-y divide-gray-100">
            <div className="grid grid-cols-12 gap-2 items-center py-2">
              <div className="col-span-6">
                <p className="font-bold text-gray-900 text-sm">{order.product.name}</p>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  แบรนด์: {order.product.brand} • รุ่น: {order.product.model}
                </p>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {order.assignedAsset?.serialNumber || "กำลังเตรียมเครื่อง"}
                </span>
              </div>
              <div className="col-span-2 text-right text-gray-700">
                {formatTHB(order.dailyRate)}
              </div>
              <div className="col-span-2 text-right font-bold text-gray-900">
                {formatTHB(order.rentTotal)}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center py-2 text-amber-900 bg-amber-50/40 px-2 rounded-lg mt-2">
              <div className="col-span-8 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                เงินประกัน / ค่ามัดจำอุปกรณ์ (Security Deposit)
              </div>
              <div className="col-span-4 text-right font-bold">
                {formatTHB(order.depositAmount)}
              </div>
            </div>
          </div>
        </div>

        {/* Settlement Breakdown (Fines & Deposit Refund) */}
        {inspection && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              สรุปผลการตรวจสภาพและคืนเงินมัดจำ (Inspection & Refund Settlement)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-gray-600">
                <p>
                  <strong>ตรวจรับส่งมอบ (Check-out):</strong>{" "}
                  {inspection.checkoutDate
                    ? new Date(inspection.checkoutDate).toLocaleDateString("th-TH")
                    : "-"}
                </p>
                <p>
                  <strong>ตรวจรับคืนเครื่อง (Check-in):</strong>{" "}
                  {inspection.checkinDate
                    ? new Date(inspection.checkinDate).toLocaleDateString("th-TH")
                    : "อยู่ระหว่างการใช้งาน"}
                </p>
                <p>
                  <strong>เจ้าหน้าที่ตรวจสอบ:</strong>{" "}
                  {inspection.checkinStaffName || inspection.checkoutStaffName || "-"}
                </p>
              </div>

              <div className="space-y-1.5 text-right border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4 pt-2 sm:pt-0">
                <div className="flex justify-between text-gray-700">
                  <span>เงินมัดจำตั้งต้น:</span>
                  <span className="font-bold">{formatTHB(order.depositAmount)}</span>
                </div>
                {inspection.totalLateFee > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>หักค่าปรับส่งช้า ({inspection.overdueDays} วัน):</span>
                    <span>-{formatTHB(inspection.totalLateFee)}</span>
                  </div>
                )}
                {inspection.damageFee > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>หักค่าชำรุดเสียหาย ({inspection.damageDescription || "ความเสียหาย"}):</span>
                    <span>-{formatTHB(inspection.damageFee)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-gray-200 text-sm font-black text-emerald-700">
                  <span>ยอดเงินมัดจำโอนคืนสุทธิ:</span>
                  <span>{formatTHB(inspection.finalRefundAmount)}</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  สถานะการคืนเงิน:{" "}
                  <strong className="text-emerald-600">
                    {inspection.refundStatus === "REFUNDED" ? "โอนคืนเรียบร้อยแล้ว" : "รอดำเนินการ"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Totals Summary */}
        <div className="flex justify-end pt-2">
          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>ค่าเช่ารวม:</span>
              <span className="font-semibold text-gray-900">{formatTHB(order.rentTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>เงินประกันมัดจำ:</span>
              <span className="font-semibold text-amber-700">
                {formatTHB(order.depositAmount)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-gray-900 text-base font-black text-gray-900">
              <span>ยอดรวมทั้งสิ้น:</span>
              <span className="text-blue-600">{formatTHB(order.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Digital Signature & Legal Clause */}
        <div className="pt-8 border-t border-gray-200 text-[11px] text-gray-400 space-y-4">
          <div className="grid grid-cols-2 gap-8 text-center pt-4">
            <div className="space-y-1">
              <div className="h-12 flex items-center justify-center font-serif italic text-sm text-blue-700">
                TechRent Official Signature
              </div>
              <div className="border-t border-gray-300 pt-1 font-bold text-gray-700">
                บจก. เทคเรนท์ ฮับ (ผู้ให้เช่า)
              </div>
            </div>

            <div className="space-y-1">
              <div className="h-12 flex items-center justify-center font-serif italic text-sm text-gray-700">
                {order.customer.name} (Digital Signed)
              </div>
              <div className="border-t border-gray-300 pt-1 font-bold text-gray-700">
                {order.customer.name} (ผู้เช่า)
              </div>
            </div>
          </div>

          <p className="text-center pt-4">
            เอกสารนี้สร้างขึ้นโดยระบบอัตโนมัติของ TechRent Platform และได้รับการรับรองลายมือชื่ออิเล็กทรอนิกส์ตามกฎหมาย
          </p>
        </div>
      </div>
    </div>
  );
}
