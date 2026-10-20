"use client";

import React, { useState, useEffect } from "react";
import { User, ShieldCheck, ShieldAlert, ArrowRightLeft, Check, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export interface DemoUserOption {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "STAFF" | "ADMIN";
  kycStatus: string;
  badge: string;
  description: string;
}

const DEMO_USERS: DemoUserOption[] = [
  {
    id: "user-cust-1",
    email: "somchai@example.com",
    name: "สมชาย มีทรัพย์ (ลูกค้า - ยืนยัน KYC แล้ว)",
    role: "CUSTOMER",
    kycStatus: "APPROVED",
    badge: "KYC Approved",
    description: "ลูกค้าพร้อมเช่าทันที มีประวัติและผ่านการอนุมัติเอกสารแล้ว",
  },
  {
    id: "user-cust-2",
    email: "kanya@example.com",
    name: "กัญญา เรียนดี (ลูกค้าใหม่ - รอตรวจ KYC)",
    role: "CUSTOMER",
    kycStatus: "PENDING",
    badge: "KYC Pending",
    description: "ลูกค้าใหม่ เพิ่งส่งข้อมูลติดต่อฉุกเฉิน รอแอดมินตรวจ",
  },
  {
    id: "user-staff-1",
    email: "anan@techrent.co",
    name: "อนันต์ ตรวจสอบ (เจ้าหน้าที่หน้าร้าน / Staff)",
    role: "STAFF",
    kycStatus: "APPROVED",
    badge: "Staff Inspector",
    description: "เจ้าหน้าที่ตรวจรับเครื่อง Check-out / Check-in และประเมินค่าเสียหาย",
  },
  {
    id: "user-admin-1",
    email: "admin@techrent.co",
    name: "สมโภชน์ ผู้ดูแลระบบ (Super Admin)",
    role: "ADMIN",
    kycStatus: "APPROVED",
    badge: "Super Admin",
    description: "ผู้ดูแลระบบเต็มรูปแบบ ตรวจสลิป อนุมัติออร์เดอร์ จัดการคลัง คืนมัดจำ ดู Audit Log",
  },
];

export default function QuickAuthSwitcher() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
  }, []);

  const handleSwitch = async (demoUser: DemoUserOption) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/quick-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoUser.email }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setIsOpen(false);
        if (demoUser.role === "ADMIN" || demoUser.role === "STAFF") {
          router.push("/admin/dashboard");
        } else {
          router.push("/catalog");
        }
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      router.push("/auth/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100 transition shadow-sm"
        title="สลับผู้ใช้งานสำหรับทดสอบระบบ (Demo Switcher)"
      >
        <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden md:inline font-semibold">Demo Switcher:</span>
        <span className="max-w-[120px] truncate font-medium">
          {currentUser ? `${currentUser.name.split(" ")[0]} (${currentUser.role})` : "เลือกบทบาททดสอบ"}
        </span>
        <ChevronDown className="w-3 h-3 text-blue-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-2 animate-in fade-in zoom-in-95">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-900">สลับบัญชีทดสอบด่วน</p>
              <p className="text-[11px] text-gray-500">ทดสอบทุก Flow ได้ในคลิกเดียว</p>
            </div>
            {currentUser && (
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-600 p-1 rounded-lg"
                title="ออกจากระบบ"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-1.5 py-2">
            {DEMO_USERS.map((u) => {
              const isSelected = currentUser?.email === u.email;
              return (
                <button
                  key={u.id}
                  onClick={() => handleSwitch(u)}
                  disabled={loading}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-start gap-2.5 ${
                    isSelected
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md mt-0.5 ${
                      u.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : u.role === "STAFF"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 truncate">
                        {u.name.split(" ")[0]}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          u.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "STAFF"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {u.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                      {u.description}
                    </p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
