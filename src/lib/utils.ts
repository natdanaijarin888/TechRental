import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTHB(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSimpleDate(date: Date | string): string {
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch {
    return String(date);
  }
}

export function formatThaiFullDate(date: Date | string): string {
  try {
    return format(new Date(date), "d MMMM yyyy", { locale: th });
  } catch {
    return String(date);
  }
}

export function getOrderStatusBadge(status: string) {
  switch (status) {
    case "PENDING":
      return {
        label: "รอตรวจสอบสลิป/KYC",
        color: "bg-amber-100 text-amber-800 border-amber-300",
        step: 1,
      };
    case "APPROVED":
      return {
        label: "อนุมัติแล้ว / รอส่งมอบ",
        color: "bg-blue-100 text-blue-800 border-blue-300",
        step: 2,
      };
    case "ACTIVE":
      return {
        label: "กำลังใช้งาน (In-Use)",
        color: "bg-emerald-100 text-emerald-800 border-emerald-300",
        step: 3,
      };
    case "RETURNED":
      return {
        label: "ส่งคืนแล้ว / รอตรวจสภาพ",
        color: "bg-purple-100 text-purple-800 border-purple-300",
        step: 4,
      };
    case "COMPLETED":
      return {
        label: "เสร็จสิ้น / คืนมัดจำแล้ว",
        color: "bg-gray-100 text-gray-800 border-gray-300",
        step: 5,
      };
    case "REJECTED":
      return {
        label: "ปฏิเสธคำสั่งเช่า",
        color: "bg-rose-100 text-rose-800 border-rose-300",
        step: 0,
      };
    case "CANCELLED":
      return {
        label: "ยกเลิกแล้ว",
        color: "bg-zinc-100 text-zinc-600 border-zinc-300",
        step: 0,
      };
    default:
      return {
        label: status,
        color: "bg-gray-100 text-gray-800 border-gray-300",
        step: 0,
      };
  }
}

export function getKYCBadge(status: string) {
  switch (status) {
    case "APPROVED":
      return {
        label: "ยืนยันตัวตนแล้ว (Verified)",
        color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    case "PENDING":
      return {
        label: "รอเจ้าหน้าที่ตรวจสอบ",
        color: "bg-amber-100 text-amber-800 border-amber-300",
      };
    case "REJECTED":
      return {
        label: "ถูกปฏิเสธ (โปรดอัปโหลดใหม่)",
        color: "bg-rose-100 text-rose-800 border-rose-300",
      };
    default:
      return {
        label: "ยังไม่ยืนยันตัวตน",
        color: "bg-gray-100 text-gray-700 border-gray-300",
      };
  }
}

export function getAssetStatusBadge(status: string) {
  switch (status) {
    case "AVAILABLE":
      return {
        label: "ว่างพร้อมเช่า",
        color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    case "RENTED":
      return {
        label: "อยู่ระหว่างให้เช่า",
        color: "bg-blue-100 text-blue-800 border-blue-300",
      };
    case "MAINTENANCE":
      return {
        label: "ส่งซ่อม/ตรวจเช็ค",
        color: "bg-amber-100 text-amber-800 border-amber-300",
      };
    case "DAMAGED":
      return {
        label: "ชำรุดเสียหาย",
        color: "bg-rose-100 text-rose-800 border-rose-300",
      };
    case "RETIRED":
      return {
        label: "ปลดประจำการ",
        color: "bg-gray-100 text-gray-600 border-gray-300",
      };
    default:
      return {
        label: status,
        color: "bg-gray-100 text-gray-800 border-gray-300",
      };
  }
}
