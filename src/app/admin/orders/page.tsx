"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ShieldCheck,
  ShieldAlert,
  Layers,
  FileText,
  AlertCircle,
  X,
  Printer,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Loader2,
  Check,
} from "lucide-react";
import { formatTHB, getOrderStatusBadge, getKYCBadge } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Verification actions states
  const [availableAssets, setAvailableAssets] = useState<any[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [kycRejectReason, setKycRejectReason] = useState("");
  const [showKycRejectInput, setShowKycRejectInput] = useState(false);
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

  const openReviewModal = async (order: any) => {
    setSelectedOrder(order);
    setSelectedAssetId(order.assignedAssetId || "");
    setShowRejectInput(false);
    setRejectReason("");
    setShowKycRejectInput(false);
    setKycRejectReason("");
    setSuccessMsg("");
    setAvailableAssets([]);

    // Fetch available assets for this order
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/assign-asset`);
      if (res.ok) {
        const data = await res.json();
        setAvailableAssets(data.assets || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReviewOrder = async (
    action: "APPROVE_PAYMENT" | "REJECT_PAYMENT" | "CANCEL_ORDER"
  ) => {
    if (!selectedOrder) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectReason }),
      });

      if (res.ok) {
        const isApproved = action === "APPROVE_PAYMENT";
        const isRejected = action === "REJECT_PAYMENT";
        setSuccessMsg(
          isApproved
            ? "อนุมัติการชำระเงินและเปลี่ยนสถานะเป็น 'อนุมัติแล้ว/รอส่งมอบ' เรียบร้อย!"
            : isRejected
            ? "ปฏิเสธสลิปการโอนเงินเรียบร้อยแล้ว!"
            : "ยกเลิกคำสั่งเช่าเรียบร้อยแล้ว!"
        );

        // Immediately update selectedOrder in modal
        setSelectedOrder((prev: any) =>
          prev
            ? {
                ...prev,
                paymentStatus: isApproved ? "VERIFIED" : isRejected ? "REJECTED" : prev.paymentStatus,
                status: isApproved ? "APPROVED" : action === "CANCEL_ORDER" ? "CANCELLED" : prev.status,
              }
            : null
        );

        // Update orders table in background
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === selectedOrder.id
              ? {
                  ...o,
                  paymentStatus: isApproved ? "VERIFIED" : isRejected ? "REJECTED" : o.paymentStatus,
                  status: isApproved ? "APPROVED" : action === "CANCEL_ORDER" ? "CANCELLED" : o.status,
                }
              : o
          )
        );

        setShowRejectInput(false);
        setRejectReason("");
        fetchOrders();
      } else {
        const err = await res.json();
        alert(err.error || "เกิดข้อผิดพลาดในการตรวจสอบสลิป");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReviewKYC = async (userId: string, action: "APPROVE" | "REJECT") => {
    if (!selectedOrder) return;
    setActionLoading(true);
    const reasonToSend =
      action === "REJECT" ? kycRejectReason || "เอกสารหรือรูปถ่ายไม่ชัดเจน ไม่ผ่านเกณฑ์ตรวจสอบ" : undefined;

    try {
      const res = await fetch(`/api/admin/kyc/${userId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectReason: reasonToSend }),
      });

      if (res.ok) {
        const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";
        setSuccessMsg(`บันทึกผลการตรวจ KYC: ${action === "APPROVE" ? "อนุมัติเรียบร้อยแล้ว" : "ปฏิเสธแล้ว"}`);

        // Immediately update selectedOrder in modal
        setSelectedOrder((prev: any) =>
          prev
            ? {
                ...prev,
                customer: {
                  ...prev.customer,
                  kycStatus: newStatus,
                  kycRejectReason: reasonToSend || null,
                },
              }
            : null
        );

        // Immediately update all orders of this customer in table
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.customerId === userId || o.customer?.id === userId
              ? {
                  ...o,
                  customer: {
                    ...o.customer,
                    kycStatus: newStatus,
                  },
                }
              : o
          )
        );

        setShowKycRejectInput(false);
        setKycRejectReason("");
        fetchOrders();
      } else {
        const err = await res.json();
        alert(err.error || "เกิดข้อผิดพลาดในการบันทึกผล KYC");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignAsset = async () => {
    if (!selectedOrder || !selectedAssetId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}/assign-asset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId: selectedAssetId }),
      });

      if (res.ok) {
        const chosenAsset = availableAssets.find((a) => a.id === selectedAssetId);
        const snLabel = chosenAsset?.serialNumber || selectedAssetId;
        setSuccessMsg(`กำหนดเครื่อง Serial Number: ${snLabel} ให้กับออร์เดอร์สำเร็จ!`);

        // Immediately update selectedOrder in modal
        setSelectedOrder((prev: any) =>
          prev
            ? {
                ...prev,
                assignedAssetId: selectedAssetId,
                assignedAsset: chosenAsset
                  ? { id: chosenAsset.id, serialNumber: chosenAsset.serialNumber, status: "RENTED" }
                  : prev.assignedAsset,
              }
            : null
        );

        // Immediately update orders table
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === selectedOrder.id
              ? {
                  ...o,
                  assignedAssetId: selectedAssetId,
                  assignedAsset: chosenAsset
                    ? { id: chosenAsset.id, serialNumber: chosenAsset.serialNumber, status: "RENTED" }
                    : o.assignedAsset,
                }
              : o
          )
        );

        // Refresh available assets list
        const assetRes = await fetch(`/api/admin/orders/${selectedOrder.id}/assign-asset`);
        if (assetRes.ok) {
          const assetData = await assetRes.json();
          setAvailableAssets(assetData.assets || []);
        }

        fetchOrders();
      } else {
        const err = await res.json();
        alert(err.error || "เกิดข้อผิดพลาดในการกำหนด Serial Number");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "ALL") return true;
    return o.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Order Approval & Verification
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">
            ตรวจสอบคำขอเช่า, KYC และกำหนด Serial Number
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ตรวจสลิปโอนเงิน ตรวจสอบข้อมูลผู้เช่า และเลือกเครื่องพร้อมเช่าส่งมอบให้ลูกค้า
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          รีเฟรชรายการ
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "ALL", label: "ทั้งหมด" },
          { id: "PENDING", label: "รอตรวจสลิป/KYC" },
          { id: "APPROVED", label: "อนุมัติแล้ว/รอส่งมอบ" },
          { id: "ACTIVE", label: "กำลังใช้งาน" },
          { id: "RETURNED", label: "ส่งคืนแล้ว" },
          { id: "COMPLETED", label: "เสร็จสิ้น" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              statusFilter === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดคำสั่งเช่า...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">เลขที่ออร์เดอร์</th>
                  <th className="p-4">ลูกค้า & KYC</th>
                  <th className="p-4">อุปกรณ์ที่เช่า</th>
                  <th className="p-4">กำหนดวันเช่า</th>
                  <th className="p-4">ยอดรวมสุทธิ</th>
                  <th className="p-4">สถานะคำสั่งเช่า</th>
                  <th className="p-4">เครื่องที่ระบุ (S/N)</th>
                  <th className="p-4 text-center min-w-[120px]">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-400">
                      ไม่พบคำสั่งเช่าในสถานะนี้
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const badge = getOrderStatusBadge(o.status);
                    const kycBadge = getKYCBadge(o.customer?.kycStatus);
                    return (
                      <tr key={o.id} className="hover:bg-blue-50/40 transition">
                        <td className="p-4 font-mono font-bold text-gray-900">
                          {o.orderNumber}
                          <span className="block text-[10px] font-normal text-gray-400">
                            {new Date(o.createdAt).toLocaleDateString("th-TH")}
                          </span>
                          {o.customerNotes?.includes("แจ้งปัญหา") && (
                            <span className="inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[9px] font-bold">
                              🚨 มีแจ้งปัญหา
                            </span>
                          )}
                          {o.customerNotes?.includes("ขยายเวลาเช่า") && (
                            <span className="inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-bold ml-1">
                              ⏱️ ต่อเวลา
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-gray-900">{o.customer?.name || "-"}</p>
                          <span
                            className={`inline-block mt-0.5 text-[9px] px-2 py-0.5 rounded-full font-bold border ${kycBadge.color}`}
                          >
                            KYC: {o.customer?.kycStatus || "UNSUBMITTED"}
                          </span>
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-gray-800 line-clamp-1">{o.product?.name || "-"}</p>
                          <span className="text-[10px] text-gray-400">
                            {formatTHB(o.product?.dailyRate || 0)}/วัน
                          </span>
                        </td>

                        <td className="p-4 text-gray-600">
                          {new Date(o.startDate).toLocaleDateString("th-TH")} →{" "}
                          {new Date(o.endDate).toLocaleDateString("th-TH")}
                          <span className="block text-[10px] text-blue-600 font-bold">
                            ({o.totalDays} วัน)
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="font-black text-gray-900 text-sm">
                            {formatTHB(o.grandTotal)}
                          </span>
                          <span className="block text-[10px] text-gray-400">
                            มัดจำ {formatTHB(o.depositAmount)}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </td>

                        <td className="p-4">
                          {o.assignedAsset ? (
                            <span className="font-mono font-bold text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 whitespace-nowrap">
                              {o.assignedAsset.serialNumber}
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-600 font-medium whitespace-nowrap">
                              ⚠️ ยังไม่ระบุเครื่อง
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center whitespace-nowrap min-w-[120px]">
                          <button
                            onClick={() => openReviewModal(o)}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition shadow-sm inline-flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <Eye className="w-3.5 h-3.5 shrink-0" />
                            ตรวจสอบ
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review & Inspection Modal Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Order Review & Asset Assignment
                </span>
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <span>ตรวจสอบคำสั่งเช่า {selectedOrder.orderNumber}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      getOrderStatusBadge(selectedOrder.status).color
                    }`}
                  >
                    {getOrderStatusBadge(selectedOrder.status).label}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700">
              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {successMsg}
                </div>
              )}

              {/* 1. KYC Verification Box */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    1. ตรวจสอบข้อมูลผู้เช่าและเอกสาร KYC
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      getKYCBadge(selectedOrder.customer?.kycStatus).color
                    }`}
                  >
                    สถานะ KYC: {selectedOrder.customer?.kycStatus || "UNSUBMITTED"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-gray-400 block text-[10px]">ชื่อลูกค้า:</span>
                    <p className="font-bold text-gray-900">{selectedOrder.customer?.name || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">เบอร์โทรศัพท์:</span>
                    <p className="font-bold text-gray-900">{selectedOrder.customer?.phone || "-"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-400 block text-[10px]">ที่อยู่จัดส่ง:</span>
                    <p className="text-gray-800 font-medium">
                      {selectedOrder.customer?.address || selectedOrder.deliveryAddress || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">บุคคลติดต่อฉุกเฉิน:</span>
                    <p className="font-semibold text-gray-800">
                      {selectedOrder.customer?.emergencyContactName || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">เบอร์โทรฉุกเฉิน:</span>
                    <p className="font-semibold text-gray-800">
                      {selectedOrder.customer?.emergencyContactPhone || "-"}
                    </p>
                  </div>
                  {selectedOrder.customer?.kycRejectReason && (
                    <div className="sm:col-span-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-[11px]">
                      <strong>เหตุผลการปฏิเสธ KYC ก่อนหน้า:</strong> {selectedOrder.customer.kycRejectReason}
                    </div>
                  )}
                </div>

                {/* KYC Documents Preview */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                  <span className="text-gray-500 font-bold block text-[11px]">
                    เอกสารยืนยันตัวตนที่แนบมา (ID Documents):
                  </span>
                  <div className="flex flex-wrap gap-3 items-start">
                    {selectedOrder.customer?.kycIdCardImage ? (
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 block">บัตรประชาชน:</span>
                        <a
                          href={selectedOrder.customer.kycIdCardImage}
                          target="_blank"
                          rel="noreferrer"
                          className="block group relative"
                        >
                          <img
                            src={selectedOrder.customer.kycIdCardImage}
                            alt="บัตรประชาชน"
                            className="w-40 h-24 object-cover rounded-lg border border-gray-300 group-hover:opacity-90 transition shadow-sm"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <ExternalLink className="w-2.5 h-2.5" /> ดูรูปเต็ม
                          </span>
                        </a>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400 text-[10px]">
                        ยังไม่มีรูปบัตรประชาชนแนบมา
                      </div>
                    )}

                    {selectedOrder.customer?.kycStudentIdImage && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 block">บัตรนักศึกษา / พนักงาน:</span>
                        <a
                          href={selectedOrder.customer.kycStudentIdImage}
                          target="_blank"
                          rel="noreferrer"
                          className="block group relative"
                        >
                          <img
                            src={selectedOrder.customer.kycStudentIdImage}
                            alt="บัตรนักศึกษา"
                            className="w-40 h-24 object-cover rounded-lg border border-gray-300 group-hover:opacity-90 transition shadow-sm"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <ExternalLink className="w-2.5 h-2.5" /> ดูรูปเต็ม
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* KYC Actions */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleReviewKYC(selectedOrder.customerId || selectedOrder.customer?.id, "APPROVE")}
                    disabled={actionLoading}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
                  >
                    {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    อนุมัติข้อมูลผู้เช่า (Approve KYC)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKycRejectInput(!showKycRejectInput)}
                    disabled={actionLoading}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    ปฏิเสธ KYC (Reject)
                  </button>
                </div>

                {showKycRejectInput && (
                  <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2 animate-in fade-in">
                    <span className="text-[11px] font-bold text-rose-900 block">ระบุเหตุผลในการปฏิเสธ KYC:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {[
                        "รูปถ่ายบัตรประชาชนไม่ชัดเจน",
                        "ชื่อ-นามสกุลไม่ตรงกับบัตร",
                        "บัตรประชาชนหมดอายุ",
                        "ข้อมูลบุคคลติดต่อฉุกเฉินไม่ครบถ้วน",
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setKycRejectReason(preset)}
                          className="text-[10px] px-2 py-0.5 rounded bg-white border border-rose-200 text-rose-700 hover:bg-rose-100"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="พิมพ์เหตุผลการปฏิเสธ KYC..."
                        value={kycRejectReason}
                        onChange={(e) => setKycRejectReason(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleReviewKYC(
                            selectedOrder.customerId || selectedOrder.customer?.id,
                            "REJECT"
                          )
                        }
                        disabled={actionLoading}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                      >
                        ยืนยันปฏิเสธ KYC
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Payment Slip Verification Box */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    2. ตรวจสอบการชำระเงินและสลิปโอนเงิน
                  </h4>
                  <span className="font-black text-sm text-blue-700">
                    ยอดชำระ: {formatTHB(selectedOrder.grandTotal)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 pt-1">
                  <div className="relative group shrink-0">
                    <img
                      src={
                        selectedOrder.paymentSlipUrl ||
                        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80"
                      }
                      alt="Payment Slip"
                      className="w-32 h-44 object-cover rounded-xl border border-gray-300 shadow-sm"
                    />
                    <a
                      href={
                        selectedOrder.paymentSlipUrl ||
                        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1"
                    >
                      <ExternalLink className="w-2.5 h-2.5" /> ซูมรูป
                    </a>
                  </div>

                  <div className="space-y-2 flex-1">
                    <p className="text-[11px] text-gray-600">
                      วิธีชำระ: <strong>{selectedOrder.paymentMethod}</strong> • เลขอ้างอิง:{" "}
                      <strong>{selectedOrder.paymentReference || "-"}</strong>
                    </p>
                    <p className="text-[11px] text-gray-600">
                      สถานะชำระ:{" "}
                      <strong
                        className={
                          selectedOrder.paymentStatus === "VERIFIED"
                            ? "text-emerald-700"
                            : selectedOrder.paymentStatus === "REJECTED"
                            ? "text-rose-700"
                            : "text-amber-700"
                        }
                      >
                        {selectedOrder.paymentStatus}
                      </strong>
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleReviewOrder("APPROVE_PAYMENT")}
                        disabled={actionLoading}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        ยืนยันยอดเงินและอนุมัติ (Approve Slip)
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowRejectInput(!showRejectInput)}
                        disabled={actionLoading}
                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs transition disabled:opacity-50"
                      >
                        ปฏิเสธสลิป / ยกเลิก
                      </button>
                    </div>

                    {showRejectInput && (
                      <div className="pt-2 space-y-2 animate-in fade-in">
                        <input
                          type="text"
                          placeholder="ระบุเหตุผลในการปฏิเสธสลิป เช่น ยอดเงินไม่ครบ หรือ สลิปซ้ำ"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white text-gray-900"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleReviewOrder("REJECT_PAYMENT")}
                            disabled={actionLoading}
                            className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition"
                          >
                            ยืนยันปฏิเสธสลิป
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReviewOrder("CANCEL_ORDER")}
                            disabled={actionLoading}
                            className="px-3 py-1 bg-gray-600 text-white rounded-lg text-xs font-bold hover:bg-gray-700 transition"
                          >
                            ยกเลิกคำสั่งเช่านี้
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Assign Asset / Serial Number */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-600" />
                    3. กำหนดเครื่องให้ลูกค้า (Assign Serial Number)
                  </h4>
                  {selectedOrder.assignedAsset ? (
                    <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      เครื่องปัจจุบัน: {selectedOrder.assignedAsset.serialNumber}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      ⚠️ ยังไม่ระบุเครื่อง
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-gray-500">
                  เลือกระบุเครื่องและ Serial Number ว่างจริงที่จะส่งมอบสำหรับสินค้ารุ่น{" "}
                  <strong>{selectedOrder.product?.name}</strong>
                </p>

                {availableAssets.length === 0 ? (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>ไม่พบเครื่องที่ว่างในคลังสำหรับสินค้านี้ (เครื่องทั้งหมดอาจติดเช่าหรืออยู่ในสถานะชำรุด)</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <select
                      value={selectedAssetId}
                      onChange={(e) => setSelectedAssetId(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm"
                    >
                      <option value="">-- เลือก Serial Number เครื่องว่าง --</option>
                      {availableAssets.map((asset) => {
                        const isCurrent = asset.id === selectedOrder.assignedAssetId;
                        return (
                          <option
                            key={asset.id}
                            value={asset.id}
                            disabled={!asset.isAvailableForOrder && !isCurrent}
                          >
                            {asset.serialNumber} ({asset.status}) —{" "}
                            {isCurrent
                              ? "★ เครื่องปัจจุบันของออร์เดอร์นี้"
                              : asset.reason || (asset.isAvailableForOrder ? "ว่างพร้อมใช้งาน" : "ไม่ว่าง")}
                          </option>
                        );
                      })}
                    </select>

                    <button
                      type="button"
                      onClick={handleAssignAsset}
                      disabled={!selectedAssetId || actionLoading}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
                      บันทึกระบุเครื่อง
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Customer Notes & Incident Reports */}
              {selectedOrder.customerNotes && (
                <div
                  className={`p-5 rounded-2xl border space-y-2 text-xs ${
                    selectedOrder.customerNotes.includes("แจ้งปัญหา")
                      ? "bg-rose-50 border-rose-200 text-rose-950"
                      : "bg-blue-50 border-blue-200 text-blue-950"
                  }`}
                >
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    {selectedOrder.customerNotes.includes("แจ้งปัญหา") ? "🚨" : "📝"}
                    บันทึกและประวัติจากลูกค้า (Notes & Incident Reports)
                  </h4>
                  <div className="p-3 bg-white/90 rounded-xl border border-current/10 font-mono text-[11px] leading-relaxed break-words">
                    {selectedOrder.customerNotes}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
