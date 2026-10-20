"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Laptop,
  Layers,
  ClipboardCheck,
  History,
  BellRing,
  ArrowLeft,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch(() => {});
  }, [pathname]);

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "แดชบอร์ดภาพรวม",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/orders",
      label: "คำขอเช่า & ตรวจ KYC",
      icon: ClipboardList,
    },
    {
      href: "/admin/products",
      label: "จัดการรุ่นอุปกรณ์ (CRUD)",
      icon: Laptop,
    },
    {
      href: "/admin/assets",
      label: "คลัง Serial Number (S/N)",
      icon: Layers,
    },
    {
      href: "/admin/inspections",
      label: "ตรวจสภาพ & คืนมัดจำ",
      icon: ClipboardCheck,
    },
    {
      href: "/admin/audit-logs",
      label: "ประวัติการทำงาน (Audit Log)",
      icon: History,
    },
    {
      href: "/admin/notifications",
      label: "จำลองส่งแจ้งเตือน (LINE/Email)",
      icon: BellRing,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 border-r border-slate-800 flex-shrink-0">
        <div className="space-y-6">
          {/* Logo & Role */}
          <div className="px-2 pt-2">
            <Link href="/catalog" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              กลับสู่หน้าร้าน
            </Link>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              Tech<span className="text-blue-400">Rent</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Staff & Admin
              </span>
            </h2>
            {currentUser && (
              <div className="mt-2 text-xs text-slate-400">
                ผู้ใช้งาน: <strong className="text-white">{currentUser.name.split(" ")[0]}</strong>
                <span className="block text-[10px] text-blue-400">บทบาท: {currentUser.role}</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/catalog"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าร้าน</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
