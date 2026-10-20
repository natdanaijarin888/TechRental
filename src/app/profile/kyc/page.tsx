"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Phone,
  MapPin,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { getKYCBadge } from "@/lib/utils";

export default function KYCPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        const u = data.user;
        setUser(u);
        if (u) {
          setPhone(u.phone || "");
          setAddress(u.address || "");
          setEmergencyContactName(u.emergencyContactName || "");
          setEmergencyContactPhone(u.emergencyContactPhone || "");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !address.trim()) {
      setErrorMessage("กรุณาระบุเบอร์โทรศัพท์และที่อยู่จัดส่งให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          address,
          emergencyContactName,
          emergencyContactPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "เกิดข้อผิดพลาดในการส่งข้อมูลยืนยันตัวตน");
      } else {
        setSuccessMessage("บันทึกและส่งข้อมูลยืนยันตัวตนสำเร็จ! เจ้าหน้าที่จะทำการตรวจสอบข้อมูลโดยเร็ว");
        fetchProfile();
      }
    } catch (e: any) {
      setErrorMessage(e.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">กำลังโหลดข้อมูลโปรไฟล์...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-lg font-bold text-gray-900">กรุณาเข้าสู่ระบบก่อนยืนยันตัวตน</h2>
        <Link
          href="/auth/login"
          className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-sm"
        >
          ไปที่หน้าเข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  const kycBadge = getKYCBadge(user.kycStatus);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่หน้าหลัก
        </Link>

        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
          Customer Verification
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
          ระบบยืนยันข้อมูลผู้เช่า
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          เพื่อความปลอดภัยและความถูกต้องในการจัดส่งอุปกรณ์ กรุณากรอกข้อมูลส่วนตัว ที่อยู่จัดส่ง และข้อมูลติดต่อฉุกเฉินให้ครบถ้วน
        </p>
      </div>

      {/* KYC Status Banner */}
      <div
        className={`p-5 rounded-3xl border flex items-center justify-between gap-4 ${kycBadge.color}`}
      >
        <div className="flex items-center gap-3">
          {user.kycStatus === "APPROVED" ? (
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          ) : user.kycStatus === "PENDING" ? (
            <Clock className="w-8 h-8 text-amber-600 animate-pulse" />
          ) : (
            <ShieldAlert className="w-8 h-8 text-gray-500" />
          )}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block">
              สถานะการยืนยันตัวตนปัจจุบัน
            </span>
            <h3 className="text-base font-black">{kycBadge.label}</h3>
            {user.kycRejectReason && (
              <p className="text-xs text-rose-700 mt-0.5">
                เหตุผลที่ปฏิเสธ: {user.kycRejectReason} (กรุณาอัปโหลดเอกสารใหม่ด้านล่าง)
              </p>
            )}
          </div>
        </div>

        {user.kycStatus === "APPROVED" && (
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/80 text-emerald-800 text-xs font-bold shadow-sm">
            อนุมัติแล้ว
          </span>
        )}
      </div>

      {/* Success / Error Messages */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Verification Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-3">
          1. ข้อมูลส่วนตัวและที่อยู่จัดส่ง
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">ชื่อ - นามสกุล</label>
            <input
              type="text"
              disabled
              value={user.name}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">อีเมล</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              เบอร์โทรศัพท์ติดต่อ (มือถือ) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="เช่น 081-234-5678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">
              ที่อยู่ปัจจุบัน / ที่อยู่จัดส่งอุปกรณ์ *
            </label>
            <textarea
              rows={2}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="บ้านเลขที่ อาคาร ซอย ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-3 pt-2">
          2. ข้อมูลบุคคลติดต่อฉุกเฉิน (Emergency Contact)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              ชื่อบุคคลติดต่อฉุกเฉิน (เช่น บิดา, มารดา, หรือผู้ปกครอง) *
            </label>
            <input
              type="text"
              required
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              placeholder="ระบุชื่อ-นามสกุล และความสัมพันธ์"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              เบอร์โทรศัพท์ติดต่อฉุกเฉิน *
            </label>
            <input
              type="tel"
              required
              value={emergencyContactPhone}
              onChange={(e) => setEmergencyContactPhone(e.target.value)}
              placeholder="เช่น 084-555-6666"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">
            * ข้อมูลทั้งหมดจะถูกเก็บรักษาอย่างปลอดภัยตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            {isSubmitting ? "กำลังบันทึกข้อมูล..." : "บันทึกและยืนยันข้อมูลผู้เช่า"}
          </button>
        </div>
      </form>
    </div>
  );
}
