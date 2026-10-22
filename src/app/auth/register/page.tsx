"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Laptop, Lock, Mail, User, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, address }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
      } else {
        router.push("/profile/kyc");
        router.refresh();
      }
    } catch (e: any) {
      setError(e.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-2">
            <Laptop className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            สมัครสมาชิก TechRent
          </h1>
          <p className="text-xs text-gray-500">
            เริ่มต้นเช่าอุปกรณ์ไอทีระดับมืออาชีพได้ทันที
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ชื่อ - นามสกุล *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="สมชาย มั่นคง"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              อีเมล *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="somchai@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              รหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร) *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              เบอร์โทรศัพท์ติดต่อ
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08X-XXX-XXXX"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ที่อยู่ปัจจุบัน / จัดส่ง
            </label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="เขต/อำเภอ จังหวัด"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียนและยืนยันตัวตน KYC"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          มีบัญชีอยู่แล้วใช่หรือไม่?{" "}
          <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
