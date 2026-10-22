"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Laptop,
  Layers,
  FileText,
  ShieldCheck,
  ShieldAlert,
  User,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  const isAdminOrStaff =
    currentUser?.role === "ADMIN" || currentUser?.role === "STAFF";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      window.location.href = "/auth/login";
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-1">
                  Tech<span className="text-blue-600">Rent</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    IT Hub
                  </span>
                </span>
                <p className="text-[10px] text-gray-500 font-medium hidden sm:block">
                  บริการเช่าอุปกรณ์ไอทีครบวงจร
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/"
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                หน้าแรก
              </Link>
              <Link
                href="/catalog"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/catalog" || pathname.startsWith("/catalog/")
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                แคตตาล็อกอุปกรณ์
              </Link>
              <Link
                href="/orders"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/orders"
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                คำสั่งเช่าของฉัน
              </Link>

              {isAdminOrStaff && (
                <Link
                  href="/admin/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    pathname.startsWith("/admin")
                      ? "text-purple-700 bg-purple-50 font-semibold"
                      : "text-purple-600 hover:text-purple-900 hover:bg-purple-50"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  ระบบแอดมิน ({currentUser.role})
                </Link>
              )}
            </nav>
          </div>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* LINE Official Contact */}
            <a
              href="https://lin.ee/5NAQU1y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] text-xs font-bold transition"
              title="ติดต่อเราผ่าน LINE"
            >
              <svg
                className="w-3.5 h-3.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.607.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.026c-.052.316-.25 1.237 1.083.675 1.334-.563 7.202-4.241 9.827-7.26 1.488-1.688 2.146-3.468 2.146-5.725z" />
              </svg>
              <span>LINE ติดต่อเรา</span>
            </a>

            {/* Notifications */}
            <NotificationBell />

            {/* KYC Status indicator or Login button */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <Link
                  href="/profile/kyc"
                  className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 transition ${
                    currentUser.kycStatus === "APPROVED"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      : currentUser.kycStatus === "PENDING"
                      ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                  title="คลิกเพื่อจัดการยืนยันตัวตน KYC"
                >
                  {currentUser.kycStatus === "APPROVED" ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>KYC ผ่านแล้ว</span>
                    </>
                  ) : currentUser.kycStatus === "PENDING" ? (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>รอตรวจ KYC</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
                      <span>ยังไม่ยืนยัน KYC</span>
                    </>
                  )}
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  title="โปรไฟล์"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-sm transition"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <NotificationBell />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-3 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              หน้าแรก
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              แคตตาล็อกอุปกรณ์
            </Link>
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              คำสั่งเช่าของฉัน
            </Link>
            <a
              href="https://lin.ee/5NAQU1y"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#06C755] bg-[#06C755]/10 hover:bg-[#06C755]/20"
            >
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.607.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.026c-.052.316-.25 1.237 1.083.675 1.334-.563 7.202-4.241 9.827-7.26 1.488-1.688 2.146-3.468 2.146-5.725z" />
              </svg>
              <span>ติดต่อเราผ่าน LINE</span>
            </a>
            {currentUser && (
              <Link
                href="/profile/kyc"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ยืนยันตัวตน KYC ({currentUser.kycStatus})
              </Link>
            )}
            {isAdminOrStaff && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-purple-700 bg-purple-50"
              >
                แดชบอร์ดแอดมิน ({currentUser.role})
              </Link>
            )}
            {currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                ออกจากระบบ
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
