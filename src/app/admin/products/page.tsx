"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Laptop,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Package,
  Sparkles,
  Layers,
  RefreshCw,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  // Form
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [weeklyRate, setWeeklyRate] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specsText, setSpecsText] = useState("");
  const [accessoriesText, setAccessoriesText] = useState("");
  const [initialSerialNumbers, setInitialSerialNumbers] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
        if (data.categories?.length > 0 && !categoryId) {
          setCategoryId(data.categories[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId("");
    setName("");
    setBrand("");
    setModel("");
    setDescription("");
    setDailyRate("1200");
    setWeeklyRate("7000");
    setDepositAmount("15000");
    setImageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80");
    setSpecsText('{\n  "cpu": "Intel Core i9 / Apple M-series",\n  "ram": "32GB",\n  "storage": "1TB SSD"\n}');
    setAccessoriesText("สายชาร์จแท้, กระเป๋ากันกระแทก, อะแดปเตอร์");
    setInitialSerialNumbers("ITEM-001, ITEM-002");
    setMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setIsEditing(true);
    setEditingId(p.id);
    setName(p.name);
    setBrand(p.brand);
    setCategoryId(p.categoryId);
    setModel(p.model);
    setDescription(p.description);
    setDailyRate(String(p.dailyRate));
    setWeeklyRate(String(p.weeklyRate));
    setDepositAmount(String(p.depositAmount));
    setImageUrl(p.imageUrl);
    setSpecsText(typeof p.specs === "string" ? p.specs : JSON.stringify(p.specs, null, 2));
    setAccessoriesText(
      Array.isArray(p.accessoriesArr) ? p.accessoriesArr.join(", ") : p.accessoriesIncluded
    );
    setInitialSerialNumbers("");
    setMsg("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");

    let parsedSpecs = {};
    try {
      parsedSpecs = JSON.parse(specsText);
    } catch {
      parsedSpecs = { details: specsText };
    }

    const accessoriesList = accessoriesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const serialList = initialSerialNumbers
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name,
      brand,
      categoryId,
      model,
      description,
      specs: parsedSpecs,
      accessoriesIncluded: accessoriesList,
      dailyRate: parseFloat(dailyRate),
      weeklyRate: parseFloat(weeklyRate),
      depositAmount: parseFloat(depositAmount),
      imageUrl,
      initialSerialNumbers: serialList,
    };

    try {
      const url = isEditing ? `/api/products/${editingId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg(isEditing ? "แก้ไขสินค้าสำเร็จ!" : "เพิ่มสินค้าใหม่สำเร็จ!");
        fetchProducts();
        setTimeout(() => setIsModalOpen(false), 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการปิดการใช้งานสินค้ารายการนี้?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Product Management (CRUD)
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">จัดการรุ่นอุปกรณ์ไอที</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            เพิ่ม ลบ แก้ไขสเปก อุปกรณ์เสริมในชุด ราคาเช่าต่อวัน และเงินมัดจำ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            เพิ่มอุปกรณ์ใหม่
          </button>
        </div>
      </div>

      {/* Products Grid / Table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดรายการอุปกรณ์...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-gray-100">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-sm text-gray-900">
                    {p.category?.name}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                    สต็อก {p.totalUnits} เครื่อง
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">
                    {p.brand} • {p.model}
                  </span>
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>

                  <div className="pt-2 flex justify-between text-xs font-semibold text-gray-700">
                    <span>ค่าเช่า: {formatTHB(p.dailyRate)}/วัน</span>
                    <span className="text-amber-700">มัดจำ: {formatTHB(p.depositAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <Link
                  href={`/admin/assets?productId=${p.id}`}
                  className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  ดู S/N ({p.totalUnits})
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-200 transition"
                    title="แก้ไข"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                    title="ลบ / ปิดการใช้งาน"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">
                {isEditing ? "แก้ไขข้อมูลอุปกรณ์" : "เพิ่มอุปกรณ์ใหม่ในระบบ"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto">
              {msg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {msg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-semibold text-gray-700 mb-1">ชื่ออุปกรณ์ *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น Apple MacBook Pro 16 M3 Max"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-semibold text-gray-700 mb-1">หมวดหมู่ *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">แบรนด์ *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Apple, Sony, Dell, ASUS"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">รุ่น (Model) *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="MacBook Pro 16 (2024)"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">คำอธิบายสินค้า</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="รายละเอียดและจุดเด่นของอุปกรณ์"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ค่าเช่ารายวัน (บาท) *</label>
                  <input
                    type="number"
                    required
                    value={dailyRate}
                    onChange={(e) => setDailyRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">เงินมัดจำ (บาท) *</label>
                  <input
                    type="number"
                    required
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-amber-700"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">URL รูปภาพสินค้า</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">
                    อุปกรณ์เสริมที่มาในชุด (คั่นด้วยเครื่องหมายจุลภาค ,)
                  </label>
                  <input
                    type="text"
                    value={accessoriesText}
                    onChange={(e) => setAccessoriesText(e.target.value)}
                    placeholder="สายชาร์จ, กระเป๋า, กล่องกันกระแทก"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  />
                </div>

                {!isEditing && (
                  <div className="col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">
                      สร้าง Serial Number เริ่มต้นเข้าคลัง (คั่นด้วยจุลภาค ,)
                    </label>
                    <input
                      type="text"
                      value={initialSerialNumbers}
                      onChange={(e) => setInitialSerialNumbers(e.target.value)}
                      placeholder="เช่น LAP-001, LAP-002, LAP-003"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                    />
                  </div>
                )}
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  {isSubmitting ? "กำลังบันทึก..." : isEditing ? "บันทึกการแก้ไข" : "สร้างอุปกรณ์"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
