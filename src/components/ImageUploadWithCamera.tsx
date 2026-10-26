"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload, CheckCircle2, X, RefreshCw, Sparkles, Link2 } from "lucide-react";

interface ImageUploadWithCameraProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: "video" | "square" | "card";
}

export default function ImageUploadWithCamera({
  label,
  value,
  onChange,
  placeholder = "คลิกเพื่อเลือกไฟล์ หรือถ่ายภาพจากกล้อง",
  aspectRatio = "video",
}: ImageUploadWithCameraProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึงกล้อง หรือใช้วิธีอัปโหลดไฟล์รูปภาพ");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      onChange(dataUrl);
      stopCamera();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (e) {
      console.error(e);
      // Fallback to FileReader base64
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700">{label}</label>
        {!isCameraActive && (
          <button
            type="button"
            onClick={startCamera}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition"
          >
            <Camera className="w-3.5 h-3.5" />
            เปิดกล้องถ่ายสด
          </button>
        )}
      </div>

      {isCameraActive ? (
        <div className="relative rounded-2xl overflow-hidden bg-black border border-gray-300">
          <video ref={videoRef} className="w-full h-64 object-cover" autoPlay playsInline muted />
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-3 px-4">
            <button
              type="button"
              onClick={capturePhoto}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4" />
              กดถ่ายภาพ
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2 rounded-xl bg-gray-900/80 hover:bg-gray-900 text-white font-semibold text-xs backdrop-blur-sm transition"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      ) : value ? (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group">
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full max-h-52 object-contain mx-auto"
          />
          <div className="p-2.5 bg-white/90 backdrop-blur-sm border-t border-gray-200 flex items-center justify-between">
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> ภาพพร้อมใช้งาน
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={startCamera}
                className="text-[11px] text-blue-600 hover:underline font-semibold"
              >
                ถ่ายใหม่
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-[11px] text-red-600 hover:underline font-semibold"
              >
                ลบรูป
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-5 text-center transition bg-gray-50/50 relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {loading ? (
            <div className="space-y-1 py-2">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
              <p className="text-xs text-gray-500">กำลังอัปโหลดรูปภาพ...</p>
            </div>
          ) : (
            <div className="space-y-1.5 py-1">
              <Upload className="w-6 h-6 text-gray-400 mx-auto" />
              <p className="text-xs font-semibold text-gray-700">{placeholder}</p>
              <p className="text-[10px] text-gray-400">รองรับไฟล์ JPG, PNG หรือคลิกเปิดกล้องด้านบน</p>
            </div>
          )}
        </div>
      )}

      {/* URL Input Option */}
      {!isCameraActive && (
        <div className="pt-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-blue-600" /> หรือวางลิงก์รูปภาพโดยตรง (Image URL)
            </span>
            {value && (
              <span className="text-[10px] text-gray-400">
                พิมพ์หรือวางลิงก์เพื่อเปลี่ยนภาพได้ทันที
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="วางลิงก์ภาพ เช่น https://example.com/photo.jpg หรือ /images/products/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono text-gray-800 placeholder:font-sans placeholder:text-gray-400 shadow-sm"
              />
            </div>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition flex items-center gap-1 shrink-0"
                title="ลบรูปและล้างลิงก์"
              >
                <X className="w-3.5 h-3.5" />
                ล้าง
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
