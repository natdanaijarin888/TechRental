"use client";

import React, { useState, useEffect } from "react";
import {
  BellRing,
  Send,
  MessageSquare,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Smartphone,
  RefreshCw,
} from "lucide-react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchAllNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const triggerDueReminderSimulation = async () => {
    setSimulating(true);
    setSuccessMsg("");
    try {
      // Fetch active orders
      const orderRes = await fetch("/api/orders?status=ACTIVE");
      const orderData = await orderRes.json();
      const activeOrders = orderData.orders || [];

      if (activeOrders.length === 0) {
        setSuccessMsg("ไม่พบคำสั่งเช่าที่กำลังใช้งาน (Active) สำหรับส่งแจ้งเตือนในขณะนี้");
        setSimulating(false);
        return;
      }

      // Simulate sending 1-day reminder to all active orders
      for (const o of activeOrders) {
        // Send in-app notification
        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: o.customerId,
            title: `[LINE OA & Email] แจ้งเตือนล่วงหน้า 1 วันก่อนครบกำหนดส่งคืน`,
            message: `คำสั่งเช่า ${o.orderNumber} (${o.product.name}) จะครบกำหนดส่งคืนในวันพรุ่งนี้ กรุณาเตรียมอุปกรณ์และอุปกรณ์เสริมให้ครบชุด`,
            type: "WARNING",
            channel: "LINE_SIMULATED",
          }),
        });
      }

      setSuccessMsg(`ส่งแจ้งเตือนล่วงหน้า 1 วัน (จำลองผ่าน LINE OA & Email) สำเร็จ ${activeOrders.length} รายการ!`);
      fetchAllNotifications();
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Notification System & Dispatch Center
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">
            ศูนย์ส่งแจ้งเตือนอัตโนมัติ (LINE OA & Email)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ระบบแจ้งเตือนเมื่อเปลี่ยนสถานะ และระบบแจ้งเตือนส่งคืนเครื่องล่วงหน้า 1 วัน
          </p>
        </div>

        <button
          onClick={triggerDueReminderSimulation}
          disabled={simulating}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {simulating ? "กำลังยิงแจ้งเตือน..." : "จำลองส่งเตือนคืนเครื่องล่วงหน้า 1 วัน (LINE/Email)"}
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Simulator Previews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LINE OA Simulation Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  จำลองข้อความ LINE Official Account
                </h3>
                <p className="text-[11px] text-gray-400">LINE Messaging API (Flex Message)</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Active Channel
            </span>
          </div>

          {/* LINE Chat Bubble Mock */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                TR
              </div>
              <span className="font-bold text-xs text-gray-900">TechRent Official Account</span>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                <AlertTriangle className="w-4 h-4" />
                แจ้งเตือน: จะครบกำหนดส่งคืนอุปกรณ์พรุ่งนี้
              </div>
              <p className="text-gray-700 leading-relaxed">
                เรียนคุณสมชาย, คำสั่งเช่า <strong>TR-202609-0001</strong> (ASUS ROG Strix RTX 4090) จะครบกำหนดส่งคืนในวันพรุ่งนี้ กรุณานำอุปกรณ์และกล่องอุปกรณ์เสริมมาส่งมอบ ณ จุดบริการ
              </p>
              <div className="pt-2 border-t border-gray-100 text-center">
                <span className="text-[11px] text-emerald-600 font-bold hover:underline cursor-pointer">
                  ตรวจสอบรายละเอียดการส่งคืน →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Simulation Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  จำลองการส่งอีเมล (Resend / Nodemailer)
                </h3>
                <p className="text-[11px] text-gray-400">HTML Transactional Email</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
              Ready to Send
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="text-[11px] text-gray-500 space-y-0.5">
              <p><strong>From:</strong> no-reply@techrent.co</p>
              <p><strong>To:</strong> customer@example.com</p>
              <p><strong>Subject:</strong> [TechRent] ยืนยันการอนุมัติคำสั่งเช่าอุปกรณ์เรียบร้อยแล้ว</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-gray-700 leading-relaxed space-y-2">
              <p className="font-bold text-gray-900">เรียน คุณลูกค้าผู้เช่าอุปกรณ์,</p>
              <p>
                เอกสารยืนยันตัวตน KYC และสลิปการโอนเงินได้รับการอนุมัติแล้ว เจ้าหน้าที่ได้ระบุเครื่อง S/N ประจำตัวและพร้อมส่งมอบตามวันเวลาที่กำหนด
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications History List */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-blue-600" />
            ประวัติการส่งแจ้งเตือนทั้งหมด ({notifications.length})
          </h3>
          <button
            onClick={fetchAllNotifications}
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {notifications.map((n) => (
            <div key={n.id} className="py-3 flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{n.title}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      n.channel === "LINE_SIMULATED"
                        ? "bg-emerald-100 text-emerald-800"
                        : n.channel === "EMAIL_SIMULATED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {n.channel}
                  </span>
                </div>
                <p className="text-gray-600">{n.message}</p>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">
                {new Date(n.createdAt).toLocaleTimeString("th-TH")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
