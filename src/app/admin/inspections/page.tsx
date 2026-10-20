"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  Camera,
  AlertTriangle,
  Clock,
  ArrowRight,
  Upload,
  DollarSign,
  FileCheck,
  X,
  Sparkles,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";
import ImageUploadWithCamera from "@/components/ImageUploadWithCamera";

export default function AdminInspectionsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"CHECKOUT" | "CHECKIN" | "REFUND">("CHECKOUT");

  // Modal states
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [modalType, setModalType] = useState<"CHECKOUT" | "CHECKIN" | "REFUND" | null>(null);

  // Form states for Check-out
  const [checkoutNotes, setCheckoutNotes] = useState("ตรวจสภาพรอบตัวเครื่องเรียบร้อย ทำงานปกติทุกฟังก์ชัน");
  const [checkoutImage, setCheckoutImage] = useState("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80");

  // Form states for Check-in
  const [checkinDate, setCheckinDate] = useState(new Date().toISOString().split("T")[0]);
  const [checkinNotes, setCheckinNotes] = useState("ตรวจรับคืนอุปกรณ์ครบชุด");
  const [checkinImage, setCheckinImage] = useState("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80");
  const [damageFee, setDamageFee] = useState("0");
  const [damageDescription, setDamageDescription] = useState("");

  // Form states for Refund
  const [refundSlipImage, setRefundSlipImage] = useState("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80");
  const [refundBank, setRefundBank] = useState("พร้อมเพย์ (PromptPay)");
  const [refundAccount, setRefundAccount] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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

  // Filter orders for each tab
  const checkoutOrders = orders.filter(
    (o) => (o.status === "APPROVED" || o.status === "PENDING") && o.assignedAssetId
  );
  const checkinOrders = orders.filter((o) => o.status === "ACTIVE");
  const refundOrders = orders.filter(
    (o) => o.status === "RETURNED" && o.inspection?.refundStatus === "PENDING"
  );

  const openCheckoutModal = (order: any) => {
    setActiveOrder(order);
    setModalType("CHECKOUT");
    setSuccessMsg("");
  };

  const openCheckinModal = (order: any) => {
    setActiveOrder(order);
    setModalType("CHECKIN");
    setCheckinDate(new Date().toISOString().split("T")[0]);
    setDamageFee("0");
    setDamageDescription("");
    setSuccessMsg("");
  };

  const openRefundModal = (order: any) => {
    setActiveOrder(order);
    setModalType("REFUND");
    setRefundAccount(order.customer.phone || "-");
    setSuccessMsg("");
  };

  // Submit Checkout
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/inspections/${activeOrder.id}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkoutNotes,
          checkoutImages: [checkoutImage],
        }),
      });
      if (res.ok) {
        setSuccessMsg("บันทึก Check-out ส่งมอบเครื่องสำเร็จ! คำสั่งเช่าเข้าสู่สถานะ กำลังใช้งาน (In-Use)");
        fetchOrders();
        setTimeout(() => setModalType(null), 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Checkin
  const handleCheckinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/inspections/${activeOrder.id}/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkinDate,
          checkinNotes,
          checkinImages: [checkinImage],
          damageFee: parseFloat(damageFee || "0"),
          damageDescription,
        }),
      });
      if (res.ok) {
        setSuccessMsg("บันทึก Check-in รับคืนเครื่องและคำนวณค่าปรับสำเร็จ!");
        fetchOrders();
        setTimeout(() => setModalType(null), 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Refund
  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/inspections/${activeOrder.id}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refundSlipUrl: refundSlipImage,
          refundBankName: refundBank,
          refundBankAccount: refundAccount,
        }),
      });
      if (res.ok) {
        setSuccessMsg("โอนคืนเงินมัดจำและปิดงานคำสั่งเช่าเรียบร้อย (Completed)! เครื่องถูกปลดกลับสู่สถานะ ว่างพร้อมเช่า");
        fetchOrders();
        setTimeout(() => setModalType(null), 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Check-out & Check-in Inspection Workflow
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">
            กระบวนการตรวจสภาพเครื่อง & คำนวณคืนมัดจำ
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            บันทึกภาพถ่ายสภาพเครื่องก่อนส่งมอบ ตรวจรับคืน คำนวณค่าปรับส่งช้า/ชำรุด และโอนคืนมัดจำ
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          รีเฟรชข้อมูล
        </button>
      </div>

      {/* Workflow Tabs */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab("CHECKOUT")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "CHECKOUT"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          1. บันทึก Check-out ส่งมอบ ({checkoutOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("CHECKIN")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "CHECKIN"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          2. บันทึก Check-in รับคืน & ค่าปรับ ({checkinOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("REFUND")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "REFUND"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          3. สรุปโอนคืนเงินมัดจำ ({refundOrders.length})
        </button>
      </div>

      {/* Orders in Active Tab */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดข้อมูลการตรวจสอบ...</p>
        </div>
      ) : activeTab === "CHECKOUT" ? (
        /* Tab 1: Check-out Orders */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {checkoutOrders.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-400">
              <Camera className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-xs">ไม่มีคำสั่งเช่าที่รอ Check-out ส่งมอบในขณะนี้</p>
            </div>
          ) : (
            checkoutOrders.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-900">{o.orderNumber}</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    S/N: {o.assignedAsset?.serialNumber}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={o.product.imageUrl}
                    alt={o.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">{o.product.name}</h4>
                    <p className="text-[11px] text-gray-500">
                      ผู้เช่า: {o.customer.name} ({o.customer.phone || "-"})
                    </p>
                    <p className="text-[11px] text-gray-400">
                      ช่วงเวลา: {new Date(o.startDate).toLocaleDateString("th-TH")} ถึง{" "}
                      {new Date(o.endDate).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openCheckoutModal(o)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  บันทึก Check-out สภาพเครื่องก่อนส่งมอบ
                </button>
              </div>
            ))
          )}
        </div>
      ) : activeTab === "CHECKIN" ? (
        /* Tab 2: Check-in Orders */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {checkinOrders.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-400">
              <ClipboardCheck className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-xs">ไม่มีอุปกรณ์ที่กำลังใช้งานรอรับคืนในขณะนี้</p>
            </div>
          ) : (
            checkinOrders.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-900">{o.orderNumber}</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    กำลังใช้งาน (In-Use)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={o.product.imageUrl}
                    alt={o.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">{o.product.name}</h4>
                    <p className="text-[11px] text-gray-600 font-mono">
                      S/N: {o.assignedAsset?.serialNumber || "-"}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      กำหนดคืน: {new Date(o.endDate).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openCheckinModal(o)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  บันทึก Check-in รับคืน & ตรวจสอบค่าปรับ
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Tab 3: Refund Settlement Orders */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {refundOrders.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-400">
              <DollarSign className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-xs">ไม่มีรายการที่รอคืนเงินมัดจำในขณะนี้</p>
            </div>
          ) : (
            refundOrders.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-900">{o.orderNumber}</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                    ตรวจรับคืนแล้ว / รอโอนมัดจำ
                  </span>
                </div>

                <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>เงินมัดจำตั้งต้น:</span>
                    <span className="font-bold">{formatTHB(o.depositAmount)}</span>
                  </div>
                  {o.inspection?.totalLateFee > 0 && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>หักค่าปรับส่งช้า ({o.inspection.overdueDays} วัน):</span>
                      <span>-{formatTHB(o.inspection.totalLateFee)}</span>
                    </div>
                  )}
                  {o.inspection?.damageFee > 0 && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>หักค่าชำรุดเสียหาย:</span>
                      <span>-{formatTHB(o.inspection.damageFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1.5 border-t border-gray-200 text-sm font-black text-emerald-700">
                    <span>ยอดที่ต้องโอนคืนลูกค้า:</span>
                    <span>{formatTHB(o.inspection?.finalRefundAmount || 0)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openRefundModal(o)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  แนบสลิปและยืนยันโอนคืนมัดจำ (Complete)
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Check-out Modal */}
      {modalType === "CHECKOUT" && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">
                บันทึก Check-out ก่อนส่งมอบ ({activeOrder.orderNumber})
              </h3>
              <button onClick={() => setModalType(null)} className="p-1.5 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold">
                  {successMsg}
                </div>
              )}

              <div className="p-3 bg-blue-50 rounded-xl text-blue-900 font-semibold">
                อุปกรณ์: {activeOrder.product.name} (S/N: {activeOrder.assignedAsset?.serialNumber})
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  บันทึกสภาพเครื่องและอุปกรณ์เสริมก่อนส่งมอบ
                </label>
                <textarea
                  rows={3}
                  required
                  value={checkoutNotes}
                  onChange={(e) => setCheckoutNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                />
              </div>

              <ImageUploadWithCamera
                label="รูปถ่ายสภาพเครื่องก่อนส่งมอบ (อัปโหลด หรือถ่ายภาพสด)"
                value={checkoutImage}
                onChange={(url) => setCheckoutImage(url)}
                placeholder="คลิกเพื่อเลือกไฟล์ หรือถ่ายภาพสดด้วยกล้อง"
                aspectRatio="video"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  {isSubmitting ? "กำลังบันทึก..." : "ยืนยันส่งมอบอุปกรณ์ (Set to In-Use)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Check-in Modal */}
      {modalType === "CHECKIN" && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">
                บันทึก Check-in รับคืนเครื่อง ({activeOrder.orderNumber})
              </h3>
              <button onClick={() => setModalType(null)} className="p-1.5 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckinSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold">
                  {successMsg}
                </div>
              )}

              <div className="p-3 bg-purple-50 rounded-xl text-purple-900 font-semibold">
                อุปกรณ์: {activeOrder.product.name} (S/N: {activeOrder.assignedAsset?.serialNumber}) • กำหนดคืนเดิม: {new Date(activeOrder.endDate).toLocaleDateString("th-TH")}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  วันที่รับคืนเครื่องจริง (คำนวณค่าปรับส่งช้าอัตโนมัติ) *
                </label>
                <input
                  type="date"
                  required
                  value={checkinDate}
                  onChange={(e) => setCheckinDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ค่าปรับกรณีเครื่องชำรุดเสียหาย (Damage Fee - ถ้ามี) (บาท)
                </label>
                <input
                  type="number"
                  min="0"
                  value={damageFee}
                  onChange={(e) => setDamageFee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                />
              </div>

              {parseFloat(damageFee) > 0 && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    คำอธิบายรอยชำรุด / ความเสียหาย
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น รอยบุบที่มุมขวาบน หรือสายชาร์จชำรุด"
                    value={damageDescription}
                    onChange={(e) => setDamageDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                  />
                </div>
              )}

              <ImageUploadWithCamera
                label="รูปถ่ายสภาพเครื่องหลังรับคืน (อัปโหลด หรือถ่ายภาพสด)"
                value={checkinImage}
                onChange={(url) => setCheckinImage(url)}
                placeholder="คลิกเพื่อเลือกไฟล์ หรือถ่ายภาพสดด้วยกล้อง"
                aspectRatio="video"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                >
                  {isSubmitting ? "กำลังคำนวณ..." : "ยืนยันรับคืนและคำนวณค่าปรับ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {modalType === "REFUND" && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">
                โอนคืนเงินมัดจำ ({activeOrder.orderNumber})
              </h3>
              <button onClick={() => setModalType(null)} className="p-1.5 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRefundSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold">
                  {successMsg}
                </div>
              )}

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700">
                  ยอดเงินมัดจำคืนสุทธิ
                </span>
                <div className="text-2xl font-black text-emerald-700">
                  {formatTHB(activeOrder.inspection?.finalRefundAmount || 0)}
                </div>
                <p className="text-[11px] text-emerald-800">
                  ลูกค้า: {activeOrder.customer.name}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  ธนาคาร / ช่องทางโอนคืน
                </label>
                <input
                  type="text"
                  value={refundBank}
                  onChange={(e) => setRefundBank(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  เลขที่บัญชี / เบอร์พร้อมเพย์ลูกค้า
                </label>
                <input
                  type="text"
                  value={refundAccount}
                  onChange={(e) => setRefundAccount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-800 font-mono font-bold"
                />
              </div>

              <ImageUploadWithCamera
                label="แนบสลิปหลักฐานการโอนคืนเงินมัดจำ (อัปโหลด หรือถ่ายภาพสลิป)"
                value={refundSlipImage}
                onChange={(url) => setRefundSlipImage(url)}
                placeholder="คลิกเพื่อเลือกไฟล์สลิป หรือถ่ายภาพสด"
                aspectRatio="card"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  {isSubmitting ? "กำลังบันทึก..." : "ยืนยันโอนเงินคืนและปิดงานคำสั่งเช่า (Complete)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
