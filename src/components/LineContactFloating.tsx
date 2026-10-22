"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, MessageCircle, ExternalLink, Sparkles } from "lucide-react";

export default function LineContactFloating() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover QR Code Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Card Header */}
          <div className="bg-[#06C755] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.607.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.026c-.052.316-.25 1.237 1.083.675 1.334-.563 7.202-4.241 9.827-7.26 1.488-1.688 2.146-3.468 2.146-5.725z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  TechRent Support
                  <span className="text-[10px] bg-white text-[#06C755] px-1.5 py-0.2 rounded-full font-black">
                    LINE
                  </span>
                </h4>
                <p className="text-[10px] text-white/90">สอบถามคิวเช่า / ปรึกษาสเปก</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
              aria-label="ปิด"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-5 text-center space-y-3.5">
            <div className="relative mx-auto w-48 h-48 bg-white p-2.5 rounded-2xl border-2 border-emerald-100 shadow-sm flex items-center justify-center">
              <img
                src="/images/line-qr.jpg"
                alt="LINE QR Code TechRent"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-800">
                สแกน QR Code เพื่อแอดไลน์
              </p>
              <p className="text-[11px] text-gray-500">
                หรือแตะปุ่มด้านล่างเพื่อเปิดแอป LINE ทันที
              </p>
            </div>

            <a
              href="https://lin.ee/5NAQU1y"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs shadow-md shadow-[#06C755]/25 flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.607.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.026c-.052.316-.25 1.237 1.083.675 1.334-.563 7.202-4.241 9.827-7.26 1.488-1.688 2.146-3.468 2.146-5.725z" />
              </svg>
              <span>เพิ่มเพื่อนใน LINE</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              เจ้าหน้าที่พร้อมให้คำปรึกษาตลอด 24 ชม.
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs shadow-xl shadow-[#06C755]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="ติดต่อเราทาง LINE"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        {/* LINE Icon */}
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.607.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.026c-.052.316-.25 1.237 1.083.675 1.334-.563 7.202-4.241 9.827-7.26 1.488-1.688 2.146-3.468 2.146-5.725z" />
        </svg>

        <span className="font-extrabold tracking-wide hidden sm:inline">
          {isOpen ? "ปิดหน้าต่าง" : "สอบถามทาง LINE"}
        </span>
      </button>
    </div>
  );
}
