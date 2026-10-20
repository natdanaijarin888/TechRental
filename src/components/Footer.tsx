import React from "react";
import Link from "next/link";
import { Laptop, ShieldCheck, Clock, CreditCard, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Laptop className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Tech<span className="text-blue-400">Rent</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              แพลตฟอร์มเช่าอุปกรณ์ไอทีระดับมืออาชีพสำหรับบุคคล องค์กร และฟรีแลนซ์ เช่าง่าย ได้ของไว ปลอดภัยด้วยระบบ Serial Number Tracking
            </p>
          </div>

          {/* Col 2: Highlights */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              มาตรฐานบริการ
            </p>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ตรวจเช็คสภาพเครื่องก่อนและหลังเช่า
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                เช่ารายวัน รายสัปดาห์ ส่งมอบทันใจ
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-400" />
                คืนเงินมัดจำรวดเร็วหลังตรวจรับเครื่อง
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                อุปกรณ์แท้ศูนย์ 100% ประกันคุณภาพ
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              หมวดหมู่อุปกรณ์ยอดนิยม
            </p>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>
                <Link href="/catalog?category=laptops" className="hover:text-white transition">
                  โน้ตบุ๊ก MacBook Pro & Workstation
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=cameras" className="hover:text-white transition">
                  กล้อง Sony Full-Frame & เลนส์ G Master
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=gpus" className="hover:text-white transition">
                  การ์ดจอ NVIDIA RTX 4090 สำหรับ AI/3D
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=monitors" className="hover:text-white transition">
                  จอ OLED 4K เกรด Colorist
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=tablets" className="hover:text-white transition">
                  iPad Pro M4 + Pencil Pro
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 TechRent Platform. พัฒนาขึ้นสำหรับระบบเช่าอุปกรณ์ไอทีระดับมืออาชีพ</p>
        </div>
      </div>
    </footer>
  );
}
