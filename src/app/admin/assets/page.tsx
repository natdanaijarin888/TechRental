"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  X,
  QrCode,
} from "lucide-react";
import { getAssetStatusBadge } from "@/lib/utils";

function AdminAssetsContent() {
  const searchParams = useSearchParams();
  const initialProductId = searchParams.get("productId") || "ALL";

  const [assets, setAssets] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedProduct, setSelectedProduct] = useState(initialProductId);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Create Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProductId, setModalProductId] = useState("");
  const [modalSerialNumber, setModalSerialNumber] = useState("");
  const [modalStatus, setModalStatus] = useState("AVAILABLE");
  const [modalNotes, setModalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedProduct && selectedProduct !== "ALL") params.set("productId", selectedProduct);
      if (selectedStatus && selectedStatus !== "ALL") params.set("status", selectedStatus);

      const [assetRes, prodRes] = await Promise.all([
        fetch(`/api/admin/assets?${params.toString()}`),
        fetch("/api/products"),
      ]);

      if (assetRes.ok) {
        const data = await assetRes.json();
        setAssets(data.assets || []);
      }
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
        if (prodData.products?.length > 0 && !modalProductId) {
          setModalProductId(prodData.products[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [selectedProduct, selectedStatus]);

  const handleStatusChange = async (assetId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/assets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: assetId, status: newStatus }),
      });
      if (res.ok) {
        fetchAssets();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalMsg("");

    try {
      const res = await fetch("/api/admin/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: modalProductId,
          serialNumber: modalSerialNumber,
          status: modalStatus,
          conditionNotes: modalNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setModalMsg(data.error || "เกิดข้อผิดพลาดในการเพิ่ม S/N");
      } else {
        setModalMsg("เพิ่ม Serial Number ในคลังสำเร็จ!");
        fetchAssets();
        setTimeout(() => {
          setIsModalOpen(false);
          setModalSerialNumber("");
          setModalNotes("");
        }, 1200);
      }
    } catch (e: any) {
      setModalMsg(e.message || "เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredAssets = assets.filter((a) => {
    if (!searchTerm) return true;
    return (
      a.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Inventory & Serial Number Tracking
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">
            คลังอุปกรณ์ระดับชิ้น (Serial Numbers)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ติดตามสถานะรายเครื่อง ผูก S/N ตรวจสอบประวัติการซ่อมบำรุงและความพร้อมใช้งาน
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchAssets}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/admin/assets/tags"
            className="px-3.5 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            พิมพ์ป้ายสติกเกอร์ / QR Code
          </Link>
          <button
            onClick={() => {
              setModalMsg("");
              setIsModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            เพิ่ม Serial Number ใหม่
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-3xl border border-gray-200 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">กรองตามรุ่นอุปกรณ์</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
          >
            <option value="ALL">ทุกรุ่น ({products.length} รายการ)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">กรองตามสถานะเครื่อง</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
          >
            <option value="ALL">ทุกสถานะ</option>
            <option value="AVAILABLE">AVAILABLE (ว่างพร้อมเช่า)</option>
            <option value="RENTED">RENTED (อยู่ระหว่างให้เช่า)</option>
            <option value="MAINTENANCE">MAINTENANCE (ส่งซ่อมบำรุง)</option>
            <option value="DAMAGED">DAMAGED (ชำรุดเสียหาย)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">ค้นหา Serial Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหา S/N..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Assets Table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดสต็อก Serial Number...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Serial Number (S/N)</th>
                  <th className="p-4">รุ่นอุปกรณ์</th>
                  <th className="p-4">สถานะรายชิ้น</th>
                  <th className="p-4">บันทึกสภาพเครื่อง</th>
                  <th className="p-4">ตรวจเช็คล่าสุด</th>
                  <th className="p-4 text-center">เปลี่ยนสถานะด่วน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">
                      ไม่พบอุปกรณ์ในหมวดนี้
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => {
                    const badge = getAssetStatusBadge(asset.status);
                    return (
                      <tr key={asset.id} className="hover:bg-blue-50/40 transition">
                        <td className="p-4 font-mono font-bold text-gray-900">
                          <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-lg border border-slate-200">
                            {asset.serialNumber}
                          </span>
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-gray-900">{asset.product.name}</p>
                          <span className="text-[10px] text-gray-400">{asset.product.brand}</span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </td>

                        <td className="p-4 text-gray-600 max-w-xs truncate">
                          {asset.conditionNotes || "สภาพสมบูรณ์"}
                        </td>

                        <td className="p-4 text-gray-400 text-[11px]">
                          {asset.lastInspectedAt
                            ? new Date(asset.lastInspectedAt).toLocaleDateString("th-TH")
                            : "ยังไม่เคยตรวจ"}
                        </td>

                        <td className="p-4 text-center">
                          <select
                            value={asset.status}
                            onChange={(e) => handleStatusChange(asset.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg border border-gray-300 text-xs font-semibold bg-white text-gray-800 focus:outline-none"
                          >
                            <option value="AVAILABLE">AVAILABLE (ว่าง)</option>
                            <option value="RENTED">RENTED (เช่าอยู่)</option>
                            <option value="MAINTENANCE">MAINTENANCE (ส่งซ่อม)</option>
                            <option value="DAMAGED">DAMAGED (ชำรุด)</option>
                          </select>
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

      {/* Modal Add New Serial Number */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-md w-full shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">
                เพิ่ม Serial Number เข้าสู่คลังสินค้า
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="p-6 space-y-4 text-xs">
              {modalMsg && (
                <div
                  className={`p-3 rounded-xl font-bold flex items-center gap-2 ${
                    modalMsg.includes("สำเร็จ")
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-rose-50 text-rose-800"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {modalMsg}
                </div>
              )}

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  เลือกสินค้าที่ต้องการผูก S/N *
                </label>
                <select
                  value={modalProductId}
                  onChange={(e) => setModalProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.brand})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Serial Number เครื่อง (ห้ามซ้ำ) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น MBP-M3MAX-004"
                  value={modalSerialNumber}
                  onChange={(e) => setModalSerialNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">สถานะเริ่มต้น</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-semibold"
                >
                  <option value="AVAILABLE">AVAILABLE (ว่างพร้อมเช่า)</option>
                  <option value="MAINTENANCE">MAINTENANCE (ส่งซ่อมบำรุง)</option>
                  <option value="RENTED">RENTED (อยู่ระหว่างเช่า)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  บันทึกสภาพเครื่องเบื้องต้น
                </label>
                <input
                  type="text"
                  placeholder="เช่น เครื่องใหม่แกะกล่อง มีประกันศูนย์ 1 ปี"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                >
                  {isSubmitting ? "กำลังบันทึก..." : "เพิ่ม S/N เข้าคลัง"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminAssetsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400">กำลังโหลดข้อมูลอุปกรณ์...</div>}>
      <AdminAssetsContent />
    </Suspense>
  );
}
