"use client";

import React from "react";
import { FileText, ShieldAlert, Check, X } from "lucide-react";

interface DigitalContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  productName?: string;
  dailyRate?: number;
  depositAmount?: number;
}

export default function DigitalContractModal({
  isOpen,
  onClose,
  onAccept,
  productName = "อุปกรณ์ไอที",
  dailyRate = 1000,
  depositAmount = 10000,
}: DigitalContractModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl border border-gray-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                ข้อตกลงและสัญญาเช่าอุปกรณ์ดิจิทัล (Digital Rental Agreement)
              </h3>
              <p className="text-xs text-gray-500">
                กรุณาอ่านและทำความเข้าใจข้อกำหนดการดูแลรักษาและค่าปรับ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contract Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              สัญญานี้มีผลผูกพันทางกฎหมายระหว่างผู้เช่าและบริษัท เทคเรนท์ ฮับ จำกัด การกดยอมรับถือเป็นการลงลายมือชื่อทางอิเล็กทรอนิกส์ตาม พ.ร.บ. ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              ข้อ 1. วัตถุประสงค์และการรับมอบอุปกรณ์
            </h4>
            <p>
              1.1 ผู้เช่าตกลงเช่า <strong>{productName}</strong> เพื่อการใช้งานตามวัตถุประสงค์อันสุจริตและถูกกฎหมายเท่านั้น โดยห้ามนำอุปกรณ์ไปใช้ในกิจกรรมที่ผิดกฎหมาย ละเมิดลิขสิทธิ์ หรือก่อให้เกิดความเสียหายร้ายแรงต่อระบบ
            </p>
            <p className="mt-1">
              1.2 ผู้เช่าได้รับทราบสภาพเครื่อง อุปกรณ์เสริมครบชุด และ Serial Number เฉพาะของเครื่องตามที่ระบุในบันทึกการส่งมอบ (Check-out Inspection)
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              ข้อ 2. เงินประกันความเสียหายและเงินมัดจำ (Security Deposit)
            </h4>
            <p>
              2.1 ผู้เช่าตกลงวางเงินประกันมัดจำตามที่ระบุไว้ในระบบ โดยบริษัทจะคืนเงินมัดจำเต็มจำนวนหรือหักกลบลบหนี้ (ค่าปรับส่งคืนช้า, ค่าซ่อมแซมกรณีชำรุด) ภายใน 24 ชั่วโมง หลังการตรวจรับเครื่องคืน (Check-in Inspection)
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              ข้อ 3. การส่งคืนตรงเวลาและอัตราค่าปรับส่งคืนล่าช้า (Late Return Fee)
            </h4>
            <p>
              3.1 ผู้เช่ามีหน้าที่ส่งคืนอุปกรณ์และอุปกรณ์เสริมทั้งหมดให้ตรงตามวันและเวลาที่ระบุในคำสั่งเช่า
            </p>
            <p className="mt-1">
              3.2 ในกรณีที่ส่งคืนล่าช้ากว่ากำหนดโดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษร ผู้เช่ายินยอมเสียค่าปรับในอัตรา <strong>1.5 เท่าของอัตราค่าเช่ารายวัน</strong> สำหรับทุกๆ วันที่เกินกำหนด โดยระบบจะคำนวณและหักจากเงินประกันมัดจำโดยอัตโนมัติ
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              ข้อ 4. การดูแลรักษา ความเสียหาย และการสูญหาย (Damage & Loss Policy)
            </h4>
            <p>
              4.1 ผู้เช่าต้องดูแลรักษาอุปกรณ์เยี่ยงวิญญูชน ห้ามแกะ ซ่อมแซม ดัดแปลง หรือเปิดฝาครอบตัวเครื่องโดยเด็ดขาด
            </p>
            <p className="mt-1">
              4.2 หากอุปกรณ์เกิดความชำรุด แตกหัก หรือตกน้ำ ผู้เช่ายินยอมชดใช้ค่าซ่อมแซมตามจริงตามใบประเมินของศูนย์บริการที่ได้รับการรับรอง โดยหักจากเงินมัดจำ และหากเกินกว่าเงินมัดจำ ผู้เช่าตกลงชำระส่วนต่างที่เหลือภายใน 7 วัน
            </p>
            <p className="mt-1">
              4.3 หากอุปกรณ์สูญหาย ผู้เช่ายินยอมชดใช้มูลค่าเครื่องเต็มจำนวนตามราคาตลาด ณ วันเกิดเหตุ
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-200 transition"
          >
            ปิดหน้าต่าง
          </button>
          {onAccept && (
            <button
              type="button"
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              รับทราบและยอมรับข้อตกลง
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
