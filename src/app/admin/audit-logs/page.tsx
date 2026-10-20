"use client";

import React, { useState, useEffect } from "react";
import { History, ShieldCheck, Search, Filter, RefreshCw, Lock, Terminal } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (actionFilter && actionFilter !== "ALL") params.set("action", actionFilter);

      const res = await fetch(`/api/admin/audit-logs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  const filteredLogs = logs.filter((l) => {
    if (!searchTerm) return true;
    return (
      l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
            <Lock className="w-3 h-3" />
            Security & Compliance
          </div>
          <h1 className="text-2xl font-black text-gray-900 mt-1">
            บันทึกประวัติการทำงาน (Audit Trail / Activity Log)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            บันทึกทุกการกระทำของเจ้าหน้าที่และแอดมิน เพื่อความโปร่งใสและตรวจสอบย้อนหลังได้ 100%
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          รีเฟรชบันทึก
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-gray-200 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-700">ประเภทการกระทำ:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-gray-800"
          >
            <option value="ALL">ทั้งหมดทุกประเภท</option>
            <option value="APPROVE_KYC">อนุมัติ KYC</option>
            <option value="ORDER_APPROVE_PAYMENT">อนุมัติการชำระเงิน</option>
            <option value="ASSIGN_SERIAL_NUMBER">กำหนด Serial Number</option>
            <option value="CHECKOUT_DELIVERY">ส่งมอบเครื่อง (Check-out)</option>
            <option value="CHECKIN_INSPECT">รับคืนและคำนวณค่าปรับ (Check-in)</option>
            <option value="PROCESS_REFUND">โอนคืนเงินมัดจำ</option>
            <option value="CREATE_PRODUCT">สร้างอุปกรณ์</option>
            <option value="CREATE_ASSET_ITEM">เพิ่ม S/N ใหม่</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="ค้นหาชื่อเจ้าหน้าที่ หรือรายละเอียด..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2" />
        </div>
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">กำลังโหลดประวัติ Audit Log...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">วันและเวลา</th>
                  <th className="p-4">ผู้ดำเนินการ (Staff/Admin)</th>
                  <th className="p-4">Action ที่ทำ</th>
                  <th className="p-4">ประเภท Entity</th>
                  <th className="p-4">รายละเอียดการกระทำ (Details)</th>
                  <th className="p-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 font-sans">
                      ไม่พบประวัติการทำงานในหมวดนี้
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 text-gray-500 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString("th-TH")}
                      </td>

                      <td className="p-4 font-sans font-bold text-gray-900 whitespace-nowrap">
                        {log.userName}
                        <span
                          className={`block text-[10px] font-bold ${
                            log.userRole === "ADMIN"
                              ? "text-purple-600"
                              : log.userRole === "STAFF"
                              ? "text-amber-600"
                              : "text-blue-600"
                          }`}
                        >
                          [{log.userRole}]
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200 text-[10px]">
                          {log.action}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-gray-600 whitespace-nowrap">
                        {log.entityType}
                      </td>

                      <td className="p-4 font-sans text-gray-800 max-w-md">
                        {log.details}
                      </td>

                      <td className="p-4 text-gray-400 whitespace-nowrap">
                        {log.ipAddress || "127.0.0.1"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
