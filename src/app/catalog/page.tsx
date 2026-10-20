"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Laptop,
  Camera,
  Cpu,
  Monitor,
  Tablet,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
      if (selectedBrand && selectedBrand !== "all") params.set("brand", selectedBrand);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [selectedCategory, selectedBrand]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCatalog();
  };

  // Unique brands
  const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "priceAsc") return a.dailyRate - b.dailyRate;
    if (sortBy === "priceDesc") return b.dailyRate - a.dailyRate;
    return b.availableUnits - a.availableUnits;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Tech Rental Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mt-1">
            แคตตาล็อกอุปกรณ์ไอทีระดับมืออาชีพ
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            พร้อมระบบตรวจสอบคิวว่างล่วงหน้าและระบุ Serial Number จริงทุกเครื่อง
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="ค้นหาชื่อรุ่น สเปก หรือแบรนด์..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </form>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          ทั้งหมด ({products.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              selectedCategory === cat.slug
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat.slug === "laptops" && <Laptop className="w-3.5 h-3.5" />}
            {cat.slug === "cameras" && <Camera className="w-3.5 h-3.5" />}
            {cat.slug === "gpus" && <Cpu className="w-3.5 h-3.5" />}
            {cat.slug === "monitors" && <Monitor className="w-3.5 h-3.5" />}
            {cat.slug === "tablets" && <Tablet className="w-3.5 h-3.5" />}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter and Sorting bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-gray-700">แบรนด์:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs bg-white text-gray-800 focus:outline-none"
            >
              <option value="all">ทุกแบรนด์</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-700">เรียงลำดับ:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs bg-white text-gray-800 focus:outline-none"
          >
            <option value="popular">ความพร้อมให้เช่าสูงสุด</option>
            <option value="priceAsc">ราคาเช่า: ต่ำไปสูง</option>
            <option value="priceDesc">ราคาเช่า: สูงไปต่ำ</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดแคตตาล็อกอุปกรณ์...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-gray-200">
          <Laptop className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 text-base">ไม่พบอุปกรณ์ที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-gray-400 mt-1">
            ลองปรับเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((p) => {
            const isAvailable = p.availableUnits > 0;
            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                      {p.category.name}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                        isAvailable ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {isAvailable ? `ว่าง ${p.availableUnits} เครื่อง` : "คิวเต็ม"}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                      {p.brand} • {p.model}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-blue-600 transition">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Specs highlight pills */}
                    {p.specsObj && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.specsObj.cpu && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {p.specsObj.cpu.split("(")[0]}
                          </span>
                        )}
                        {p.specsObj.ram && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {p.specsObj.ram}
                          </span>
                        )}
                        {p.specsObj.vram && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-medium">
                            {p.specsObj.vram}
                          </span>
                        )}
                        {p.specsObj.sensor && (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-medium">
                            {p.specsObj.sensor.split(" ")[0]} 33MP
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400">ค่าเช่ารายวัน</div>
                      <div className="text-lg font-black text-gray-900">
                        {formatTHB(p.dailyRate)}{" "}
                        <span className="text-xs font-normal text-gray-500">/วัน</span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        มัดจำ {formatTHB(p.depositAmount)}
                      </div>
                    </div>

                    <Link
                      href={`/catalog/${p.id}`}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      เช่า & เช็คคิวว่าง
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
