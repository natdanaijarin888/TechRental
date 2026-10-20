"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Mail, Phone, MapPin, ShieldCheck, ShieldAlert, ArrowRight, Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { getKYCBadge } from "@/lib/utils";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.user) {
          setPhone(data.user.phone || "");
          setAddress(data.user.address || "");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/auth/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">กำลังโหลดข้อมูลโปรไฟล์...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-sm text-gray-600">กรุณาเข้าสู่ระบบก่อนดูหน้าโปรไฟล์</p>
        <Link
          href="/auth/login"
          className="inline-block px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  const kycBadge = getKYCBadge(user.kycStatus);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Account & Profile
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">จัดการโปรไฟล์ผู้ใช้งาน</h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          ออกจากระบบ
        </button>
      </div>

      {/* KYC Card banner */}
      <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.email} • บทบาท: {user.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${kycBadge.color}`}>
            {kycBadge.label}
          </span>
          <Link
            href="/profile/kyc"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1"
          >
            จัดการ KYC
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Profile Details form */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs">
        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-3">
          ข้อมูลติดต่อและที่อยู่จัดส่ง
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">เบอร์โทรศัพท์</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">บุคคลติดต่อฉุกเฉิน</label>
            <input
              type="text"
              disabled
              value={user.emergencyContactName || "ยังไม่ได้ระบุ (กรอกในหน้า KYC)"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-medium"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">ที่อยู่จัดส่งเริ่มต้น</label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ระบุที่อยู่จัดส่ง"
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <Link
            href="/orders"
            className="text-blue-600 hover:underline font-semibold"
          >
            ดูประวัติคำสั่งเช่าทั้งหมด →
          </Link>
          <button
            type="button"
            onClick={async () => {
              setIsSaving(true);
              try {
                await fetch("/api/kyc/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ phone, address }),
                });
                setSavedSuccess(true);
                setTimeout(() => setSavedSuccess(false), 2500);
              } catch (e) {
                console.error(e);
              } finally {
                setIsSaving(false);
              }
            }}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "กำลังบันทึก..." : savedSuccess ? "บันทึกสำเร็จ!" : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </div>
      </div>
    </div>
  );
}
