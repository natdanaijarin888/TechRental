"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Laptop, Lock, Mail, ArrowRight, UserCheck, Shield, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        if (data.user?.role === "ADMIN" || data.user?.role === "STAFF") {
          router.push("/admin/dashboard");
        } else {
          router.push("/catalog");
        }
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
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-2">
            <Laptop className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            เข้าสู่ระบบ TechRent
          </h1>
          <p className="text-xs text-gray-500">
            ระบบบริการเช่าอุปกรณ์ไอทีระดับมืออาชีพ
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              อีเมล (Email)
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
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2">
          ยังไม่มีบัญชีใช่หรือไม่?{" "}
          <Link href="/auth/register" className="text-blue-600 font-bold hover:underline">
            สมัครสมาชิกใหม่
          </Link>
        </div>
      </div>
    </div>
  );
}
