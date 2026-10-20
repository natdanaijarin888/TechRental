"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, QrCode, CheckSquare, Square, Laptop } from "lucide-react";
import QRCode from "qrcode";

export default function AssetTagsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/assets");
        if (res.ok) {
          const data = await res.json();
          const items = data.assets || [];
          setAssets(items);

          // Select all by default
          setSelectedIds(new Set(items.map((i: any) => i.id)));

          // Generate QR code data URLs
          const qrMap: Record<string, string> = {};
          for (const item of items) {
            const qrText = `TECHRENT://ASSET/${item.serialNumber}`;
            const dataUrl = await QRCode.toDataURL(qrText, { width: 120, margin: 1 });
            qrMap[item.id] = dataUrl;
          }
          setQrCodes(qrMap);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.size === assets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(assets.map((a) => a.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const filteredAssets = assets.filter((a) => selectedIds.has(a.id));

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <Link
            href="/admin/assets"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            กลับสู่หน้ารายการคลัง S/N
          </Link>
          <h1 className="text-2xl font-black text-gray-900">
            พิมพ์ป้ายสติกเกอร์ทรัพย์สิน (Asset Tag & QR Labels)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            สร้างป้ายกำกับเครื่องพร้อม QR Code ประจำตัว สำหรับติดบนโน้ตบุ๊ก กล้อง หรือเคสอุปกรณ์
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSelectAll}
            className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5"
          >
            {selectedIds.size === assets.length ? (
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <Square className="w-3.5 h-3.5 text-gray-400" />
            )}
            เลือกทั้งหมด ({selectedIds.size}/{assets.length})
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            สั่งพิมพ์ป้ายสติกเกอร์ (Print)
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xs">กำลังสร้างป้าย QR Code สำหรับทุกอุปกรณ์...</p>
        </div>
      ) : (
        /* Printable Tag Grid (Standard 2 or 3 columns for sticker sheets) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-3">
          {assets.map((asset) => {
            const isSelected = selectedIds.has(asset.id);
            const qrUrl = qrCodes[asset.id];

            return (
              <div
                key={asset.id}
                onClick={() => toggleSelect(asset.id)}
                className={`p-4 rounded-2xl border bg-white shadow-sm transition relative cursor-pointer print:shadow-none print:border-gray-800 ${
                  isSelected ? "border-blue-500 ring-2 ring-blue-100" : "opacity-40 border-gray-200"
                } ${!isSelected ? "print:hidden" : ""}`}
              >
                {/* Checkbox indicator (hidden on print) */}
                <div className="absolute top-3 right-3 print:hidden">
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                <div className="flex items-start gap-3">
                  {qrUrl ? (
                    <img
                      src={qrUrl}
                      alt={asset.serialNumber}
                      className="w-20 h-20 border border-gray-200 rounded-lg p-1 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400">
                      QR Code
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                        TR
                      </div>
                      <span className="text-[10px] font-black tracking-wider text-gray-800 uppercase">
                        TechRent Hub
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                      {asset.product.name}
                    </h4>

                    <div className="pt-1">
                      <span className="text-[9px] text-gray-400 block uppercase font-semibold">
                        Serial Number:
                      </span>
                      <span className="font-mono font-black text-xs text-blue-700 block tracking-wider">
                        {asset.serialNumber}
                      </span>
                    </div>

                    <div className="text-[9px] text-gray-400 pt-0.5">
                      Status: <strong>{asset.status}</strong>
                    </div>
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
