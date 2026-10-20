"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  Package,
  Layers,
  ArrowRight,
  RefreshCw,
  Eye,
  Check,
  Zap,
  Truck,
  MapPin,
  X,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { formatTHB, getOrderStatusBadge } from "@/lib/utils";
import PromptPayModal from "@/components/PromptPayModal";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");

  // Selected Order for Modals
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Return modal state
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnMethod, setReturnMethod] = useState("PARCEL");
  const [carrierName, setCarrierName] = useState("Flash Express");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [returnNotes, setReturnNotes] = useState("");
  const [submittingReturn, setSubmittingReturn] = useState(false);
  const [returnSuccessMsg, setReturnSuccessMsg] = useState("");
  const [returnErrorMsg, setReturnErrorMsg] = useState("");

  // Extend modal state
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [extendDays, setExtendDays] = useState(3);
  const [submittingExtend, setSubmittingExtend] = useState(false);
  const [extendSuccessMsg, setExtendSuccessMsg] = useState("");
  const [extendErrorMsg, setExtendErrorMsg] = useState("");

  // Issue modal state
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueCategory, setIssueCategory] = useState("ปัญหาการเปิดเครื่อง / ระบบไฟ");
  const [issueUrgency, setIssueUrgency] = useState("ปกติ (Normal)");
  const [issueDetails, setIssueDetails] = useState("");
  const [submittingIssue, setSubmittingIssue] = useState(false);
  const [issueSuccessMsg, setIssueSuccessMsg] = useState("");
  const [issueErrorMsg, setIssueErrorMsg] = useState("");

  // Pay modal state
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Cancel state
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำสั่งเช่านี้?")) return;
    setCancellingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CANCEL" }),
      });
      if (res.ok) {
        await fetchOrders();
      } else {
        const data = await res.json();
        alert(data.error || "ไม่สามารถยกเลิกคำสั่งเช่าได้");
      }
    } catch (e: any) {
      alert(e.message || "เกิดข้อผิดพลาดในการยกเลิกคำสั่งเช่า");
    } finally {
      setCancellingId(null);
    }
  };

  const openReturnModal = (order: any) => {
    setSelectedOrder(order);
    setReturnMethod("PARCEL");
    setCarrierName("Flash Express");
    setTrackingNumber("");
    setReturnNotes("");
    setReturnSuccessMsg("");
    setReturnErrorMsg("");
    setIsReturnModalOpen(true);
  };

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    if (returnMethod === "PARCEL" && !trackingNumber.trim()) {
      setReturnErrorMsg("กรุณาระบุหมายเลขพัสดุสำหรับติดตามสถานะการจัดส่งคืน");
      return;
    }

    setSubmittingReturn(true);
    setReturnErrorMsg("");
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "NOTIFY_RETURN",
          returnMethod: returnMethod === "PARCEL" ? `ขนส่ง ${carrierName}` : "ส่งคืนด้วยตนเองที่หน้าร้าน",
          returnTrackingNo: returnMethod === "PARCEL" ? trackingNumber : "คืนหน้าร้าน",
          notes: returnNotes,
        }),
      });

      if (res.ok) {
        setReturnSuccessMsg("บันทึกการแจ้งส่งคืนอุปกรณ์เรียบร้อย! เจ้าหน้าที่จะทำการตรวจเช็คสภาพเครื่อง");
        await fetchOrders();
        setTimeout(() => {
          setIsReturnModalOpen(false);
        }, 1500);
      } else {
        const data = await res.json();
        setReturnErrorMsg(data.error || "เกิดข้อผิดพลาดในการแจ้งส่งคืน");
      }
    } catch (err: any) {
      setReturnErrorMsg(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setSubmittingReturn(false);
    }
  };

  const openExtendModal = (order: any) => {
    setSelectedOrder(order);
    setExtendDays(3);
    setExtendSuccessMsg("");
    setExtendErrorMsg("");
    setIsExtendModalOpen(true);
  };

  const handleExtendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setSubmittingExtend(true);
    setExtendErrorMsg("");
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "EXTEND",
          additionalDays: extendDays,
        }),
      });

      if (res.ok) {
        setExtendSuccessMsg(`ขยายระยะเวลาเช่าเพิ่ม ${extendDays} วัน สำเร็จ!`);
        await fetchOrders();
        setTimeout(() => {
          setIsExtendModalOpen(false);
        }, 1500);
      } else {
        const data = await res.json();
        setExtendErrorMsg(data.error || "ไม่สามารถขยายเวลาเช่าได้");
      }
    } catch (err: any) {
      setExtendErrorMsg(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setSubmittingExtend(false);
    }
  };

  const openIssueModal = (order: any) => {
    setSelectedOrder(order);
    setIssueCategory("ปัญหาการเปิดเครื่อง / ระบบไฟ");
    setIssueUrgency("ปกติ (Normal)");
    setIssueDetails("");
    setIssueSuccessMsg("");
    setIssueErrorMsg("");
    setIsIssueModalOpen(true);
  };

  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    if (!issueDetails.trim()) {
      setIssueErrorMsg("กรุณาระบุรายละเอียดปัญหาที่พบ");
      return;
    }
    setSubmittingIssue(true);
    setIssueErrorMsg("");
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REPORT_ISSUE",
          issueCategory,
          urgency: issueUrgency,
          issueDetails,
        }),
      });

      if (res.ok) {
        setIssueSuccessMsg("ส่งข้อมูลแจ้งปัญหาเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด");
        await fetchOrders();
        setTimeout(() => {
          setIsIssueModalOpen(false);
        }, 1500);
      } else {
        const data = await res.json();
        setIssueErrorMsg(data.error || "ไม่สามารถส่งข้อมูลแจ้งปัญหาได้");
      }
    } catch (err: any) {
      setIssueErrorMsg(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setSubmittingIssue(false);
    }
  };

  const handlePaymentComplete = async (slipUrl: string, paymentReference: string, isMock: boolean) => {
    if (!selectedOrder) return;
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentSlipUrl: slipUrl,
          paymentReference,
          paymentMethod: isMock ? "MOCK_GATEWAY" : "PROMPTPAY",
        }),
      });

      if (res.ok) {
        await fetchOrders();
        setTimeout(() => {
          setIsPayModalOpen(false);
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "ALL") return true;
    return o.status === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Tracking & Order History
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            คำสั่งเช่าและติดตามสถานะอุปกรณ์
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            ติดตามสถานะแบบเรียลไทม์ ตรวจสอบประวัติการเช่า และพิมพ์ใบเสร็จ/ใบส่งมอบ
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          รีเฟรชสถานะ
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "ALL", label: "ทั้งหมด" },
          { id: "PENDING", label: "รอตรวจสลิป (Pending)" },
          { id: "APPROVED", label: "อนุมัติแล้ว/รอส่งมอบ (Approved)" },
          { id: "ACTIVE", label: "กำลังใช้งาน (In-Use)" },
          { id: "RETURNED", label: "ส่งคืนแล้ว/รอตรวจ (Returned)" },
          { id: "COMPLETED", label: "เสร็จสิ้น/คืนมัดจำแล้ว (Completed)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดข้อมูลคำสั่งเช่า...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-gray-200 space-y-3">
          <Package className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-800 text-base">ไม่พบคำสั่งเช่าในหมวดนี้</h3>
          <p className="text-xs text-gray-400">
            คุณสามารถเลือกดูอุปกรณ์ในแคตตาล็อกเพื่อทำรายการเช่าใหม่ได้ทันที
          </p>
          <Link
            href="/catalog"
            className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
          >
            ไปที่แคตตาล็อกอุปกรณ์
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const badge = getOrderStatusBadge(order.status);
            const startDate = new Date(order.startDate).toLocaleDateString("th-TH");
            const endDate = new Date(order.endDate).toLocaleDateString("th-TH");

            // Status Timeline progress
            const steps = [
              { key: "PENDING", label: "รอตรวจสลิป" },
              { key: "APPROVED", label: "อนุมัติส่งมอบ" },
              { key: "ACTIVE", label: "กำลังใช้งาน" },
              { key: "RETURNED", label: "ตรวจรับคืน" },
              { key: "COMPLETED", label: "คืนมัดจำเสร็จสิ้น" },
            ];

            const currentStepIdx = badge.step;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition p-6 space-y-6"
              >
                {/* Top header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-900">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      ทำรายการเมื่อ: {new Date(order.createdAt).toLocaleString("th-TH")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/orders/${order.id}/receipt`}
                      className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:border-blue-300 text-xs font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      พิมพ์ใบเสร็จ / ใบสรุป
                    </Link>
                  </div>
                </div>

                {/* Progress Stepper Timeline */}
                <div className="py-2">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 w-full z-0" />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, ((currentStepIdx - 1) / (steps.length - 1)) * 100))}%`,
                      }}
                    />

                    {steps.map((step, idx) => {
                      const isPast = currentStepIdx > idx + 1;
                      const isCurrent = currentStepIdx === idx + 1;
                      return (
                        <div
                          key={step.key}
                          className="relative z-10 flex flex-col items-center group cursor-default"
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition shadow-sm ${
                              isPast || isCurrent
                                ? "bg-blue-600 text-white ring-4 ring-blue-100"
                                : "bg-white border-2 border-gray-300 text-gray-400"
                            }`}
                          >
                            {isPast ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] mt-1.5 font-semibold text-center whitespace-nowrap hidden sm:block ${
                              isCurrent
                                ? "text-blue-600 font-bold"
                                : isPast
                                ? "text-gray-700"
                                : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Content details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  {/* Product card info (6 cols) */}
                  <div className="md:col-span-6 flex items-start gap-4">
                    <img
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {order.product.brand}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 truncate">
                        {order.product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        ระยะเวลาเช่า: {startDate} ถึง {endDate} ({order.totalDays} วัน)
                      </p>

                      {/* Serial number assigned */}
                      {order.assignedAsset ? (
                        <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          เครื่อง S/N: {order.assignedAsset.serialNumber}
                        </div>
                      ) : (
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px]">
                          <Clock className="w-3 h-3 text-gray-400" />
                          รอระบุ Serial Number ก่อนส่งมอบ
                        </div>
                      )}

                      {order.customerNotes && (
                        <div className="mt-2.5 p-2 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 leading-snug">
                          <span className="font-bold">อัปเดตคำสั่งเช่า: </span>
                          <span className="text-gray-700">{order.customerNotes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Breakdown (6 cols) */}
                  <div className="md:col-span-6 bg-gray-50 rounded-2xl p-4 text-xs space-y-1.5 border border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>ค่าเช่า ({order.totalDays} วัน):</span>
                      <span className="font-semibold text-gray-900">
                        {formatTHB(order.rentTotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>เงินประกันมัดจำ (Deposit):</span>
                      <span className="font-semibold text-amber-700">
                        {formatTHB(order.depositAmount)}
                      </span>
                    </div>

                    {/* Inspection & Refund details if returned */}
                    {order.inspection && order.inspection.checkinDate && (
                      <div className="pt-1.5 border-t border-gray-200 text-[11px] space-y-1">
                        {order.inspection.totalLateFee > 0 && (
                          <div className="flex justify-between text-rose-600 font-semibold">
                            <span>ค่าปรับส่งคืนช้า ({order.inspection.overdueDays} วัน):</span>
                            <span>-{formatTHB(order.inspection.totalLateFee)}</span>
                          </div>
                        )}
                        {order.inspection.damageFee > 0 && (
                          <div className="flex justify-between text-rose-600 font-semibold">
                            <span>ค่าปรับชำรุดเสียหาย:</span>
                            <span>-{formatTHB(order.inspection.damageFee)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>เงินมัดจำคืนสุทธิ:</span>
                          <span>{formatTHB(order.inspection.finalRefundAmount)}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-black">
                      <span className="text-gray-900">ยอดชำระรวม:</span>
                      <span className="text-blue-600">{formatTHB(order.grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Contextual Action Bar */}
                {order.status === "ACTIVE" && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                      <Zap className="w-3.5 h-3.5" />
                      <span>กำลังใช้งานอุปกรณ์ • กำหนดส่งคืน {endDate}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openExtendModal(order)}
                        className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition flex items-center gap-1.5"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        ขอขยายเวลาเช่า (+วัน)
                      </button>

                      <button
                        type="button"
                        onClick={() => openIssueModal(order)}
                        className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        แจ้งปัญหาการใช้งาน
                      </button>

                      <button
                        type="button"
                        onClick={() => openReturnModal(order)}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        แจ้งส่งคืนเครื่อง
                      </button>
                    </div>
                  </div>
                )}

                {order.status === "PENDING" && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {order.paymentSlipUrl
                          ? "แนบสลิปแล้ว กำลังรอเจ้าหน้าที่ตรวจสอบยอดเงิน"
                          : "รอการชำระเงินและแนบสลิปโอนเงิน"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsPayModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {order.paymentSlipUrl ? "อัปโหลดสลิปใหม่" : "ชำระเงิน / แนบสลิป"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingId === order.id}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {cancellingId === order.id ? "กำลังยกเลิก..." : "ยกเลิกคำสั่งเช่า"}
                      </button>
                    </div>
                  </div>
                )}

                {order.status === "RETURNED" && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200">
                      <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>
                        ส่งคืนอุปกรณ์เรียบร้อยแล้ว • เจ้าหน้าที่กำลังตรวจเช็คสภาพเครื่องและจัดทำยอดเงินมัดจำคืน
                      </span>
                    </div>
                  </div>
                )}

                {order.status === "COMPLETED" && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>รายการเสร็จสมบูรณ์ • ตรวจรับคืนและคืนเงินประกันมัดจำเรียบร้อยแล้ว</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Return Notification Modal */}
      {isReturnModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-purple-50 text-purple-900">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm">
                  แจ้งส่งคืนอุปกรณ์ ({selectedOrder.orderNumber})
                </h3>
              </div>
              <button
                onClick={() => setIsReturnModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReturnSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {returnSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{returnSuccessMsg}</span>
                </div>
              )}
              {returnErrorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{returnErrorMsg}</span>
                </div>
              )}

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <p className="font-bold text-gray-900">{selectedOrder.product.name}</p>
                <p className="text-[11px] text-gray-500 font-mono">
                  S/N: {selectedOrder.assignedAsset?.serialNumber || "-"}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  ช่องทางการส่งคืนอุปกรณ์ *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReturnMethod("PARCEL")}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition ${
                      returnMethod === "PARCEL"
                        ? "border-purple-600 bg-purple-50 text-purple-900"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Truck className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-xs">ส่งพัสดุขนส่ง</span>
                    <span className="text-[10px] text-gray-500">Flash, Kerry, EMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReturnMethod("STORE")}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition ${
                      returnMethod === "STORE"
                        ? "border-purple-600 bg-purple-50 text-purple-900"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-xs">คืนที่หน้าร้าน</span>
                    <span className="text-[10px] text-gray-500">TechRental Hub สยาม</span>
                  </button>
                </div>
              </div>

              {returnMethod === "PARCEL" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        บริษัทขนส่ง *
                      </label>
                      <select
                        value={carrierName}
                        onChange={(e) => setCarrierName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800 bg-white"
                      >
                        <option value="Flash Express">Flash Express</option>
                        <option value="Kerry Express">Kerry Express</option>
                        <option value="J&T Express">J&T Express</option>
                        <option value="ไปรษณีย์ไทย EMS">ไปรษณีย์ไทย EMS</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        หมายเลขพัสดุ (Tracking No.) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="เช่น TH123456789"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                    <strong>ที่อยู่จัดส่งคืน:</strong> บจก. เทครีลทัล ฮับ แผนกรับคืนอุปกรณ์ (ชั้น 3 อาคารสยามสแควร์วัน) 388 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กทม. 10330 (โทร. 02-123-4567)
                  </div>
                </>
              ) : (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                  <strong>นำส่งคืนที่:</strong> TechRental Hub หน้าร้านสาขาสยามสแควร์วัน ชั้น 3 เปิดให้บริการทุกวัน 10:00 - 20:00 น.
                </div>
              )}

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  หมายเหตุหรือสภาพอุปกรณ์เบื้องต้น
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น แพ็คอุปกรณ์พร้อมสายชาร์จและกล่องเดิมครบชุด"
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingReturn}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition disabled:opacity-50"
                >
                  {submittingReturn ? "กำลังบันทึก..." : "ยืนยันการแจ้งส่งคืนอุปกรณ์"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Extend Rental Duration Modal */}
      {isExtendModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-blue-50 text-blue-950">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm">
                  ขอขยายระยะเวลาเช่า ({selectedOrder.orderNumber})
                </h3>
              </div>
              <button
                onClick={() => setIsExtendModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExtendSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {extendSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{extendSuccessMsg}</span>
                </div>
              )}
              {extendErrorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{extendErrorMsg}</span>
                </div>
              )}

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>อุปกรณ์:</span>
                  <span className="font-bold text-gray-900">{selectedOrder.product.name}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>กำหนดคืนเดิม:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(selectedOrder.endDate).toLocaleDateString("th-TH")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>อัตราค่าเช่า:</span>
                  <span className="font-semibold text-blue-600">
                    {formatTHB(selectedOrder.dailyRate)}/วัน
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  เลือกจำนวนวันที่ต้องการต่อเวลาเช่าเพิ่ม:
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[1, 3, 7, 14].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setExtendDays(d)}
                      className={`py-2 px-3 rounded-xl font-bold border transition ${
                        extendDays === d
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      +{d} วัน
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600 whitespace-nowrap">หรือระบุวันเอง:</span>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={extendDays}
                    onChange={(e) => setExtendDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-3 py-1.5 rounded-xl border border-gray-300 text-center font-bold text-gray-900"
                  />
                  <span className="text-gray-600">วัน</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5 text-blue-950">
                <div className="flex justify-between">
                  <span>กำหนดส่งคืนใหม่:</span>
                  <span className="font-bold text-blue-800">
                    {new Date(
                      new Date(selectedOrder.endDate).getTime() + extendDays * 86400000
                    ).toLocaleDateString("th-TH")}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-blue-200 text-sm font-black">
                  <span>ค่าเช่าเพิ่มเติม (+{extendDays} วัน):</span>
                  <span className="text-blue-700">
                    {formatTHB(extendDays * selectedOrder.dailyRate)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingExtend}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition disabled:opacity-50"
                >
                  {submittingExtend ? "กำลังบันทึก..." : "ยืนยันการขอขยายเวลาเช่า"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Reporting Modal */}
      {isIssueModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-amber-50 text-amber-950">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-sm">
                  แจ้งปัญหาการใช้งาน / ขอความช่วยเหลือ ({selectedOrder.orderNumber})
                </h3>
              </div>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {issueSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{issueSuccessMsg}</span>
                </div>
              )}
              {issueErrorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{issueErrorMsg}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ประเภทปัญหาที่พบ *
                </label>
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800 bg-white"
                >
                  <option value="ปัญหาการเปิดเครื่อง / ระบบไฟ">ปัญหาการเปิดเครื่อง / ระบบไฟ</option>
                  <option value="หน้าจอ / การแสดงผลผิดปกติ">หน้าจอ / การแสดงผลผิดปกติ</option>
                  <option value="สายชาร์จ / อะแดปเตอร์ชำรุด">สายชาร์จ / อะแดปเตอร์ชำรุด</option>
                  <option value="พอร์ตเชื่อมต่อ / คีย์บอร์ด / ทัชแพดมีปัญหา">พอร์ตเชื่อมต่อ / คีย์บอร์ด / ทัชแพดมีปัญหา</option>
                  <option value="ซอฟต์แวร์ / ระบบปฏิบัติการขัดข้อง">ซอฟต์แวร์ / ระบบปฏิบัติการขัดข้อง</option>
                  <option value="อุปกรณ์สูญหาย / ถูกโจรกรรม">อุปกรณ์สูญหาย / ถูกโจรกรรม</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ระดับความเร่งด่วน *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "ปกติ (Normal)", label: "ปกติ", desc: "ยังเปิดติด ใช้งานได้บางส่วน" },
                    { id: "ด่วน (Urgent)", label: "ด่วน", desc: "เปิดไม่ติด กระทบงาน" },
                    { id: "ฉุกเฉิน (Critical)", label: "ฉุกเฉิน", desc: "มีควัน/แบตบวม/สูญหาย" },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setIssueUrgency(lvl.id)}
                      className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-0.5 ${
                        issueUrgency === lvl.id
                          ? "border-amber-600 bg-amber-50 text-amber-900 font-bold"
                          : "border-gray-200 bg-white text-gray-600"
                      }`}
                    >
                      <span className="text-xs">{lvl.label}</span>
                      <span className="text-[10px] text-gray-500 line-clamp-1">{lvl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  รายละเอียดอาการเสียหรือปัญหาที่เกิดขึ้น *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="โปรดอธิบายอาการ เช่น เสียบปลั๊กแล้วไฟไม่เข้า, มีเสียงพัดลมดังผิดปกติ หรืออาการอื่นๆ อย่างละเอียด"
                  value={issueDetails}
                  onChange={(e) => setIssueDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                />
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-[11px] leading-relaxed">
                💡 เมื่อส่งคำร้อง ทีมงานฝ่ายเทคนิคจะติดต่อกลับไปยังเบอร์โทรศัพท์ที่ลงทะเบียนไว้เพื่อแก้ไขปัญหาเบื้องต้น หรือประสานงานส่งเครื่องสำรองทดแทนให้ครับ
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingIssue}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition disabled:opacity-50"
                >
                  {submittingIssue ? "กำลังส่งข้อมูล..." : "ส่งเรื่องแจ้งปัญหา / ขอความช่วยเหลือ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pay Modal for Pending Orders */}
      {isPayModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setIsPayModalOpen(false)}
              className="absolute right-3 top-3 z-10 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
            <PromptPayModal
              amount={selectedOrder.grandTotal}
              orderNumber={selectedOrder.orderNumber}
              onPaymentComplete={handlePaymentComplete}
              onCancel={() => setIsPayModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
