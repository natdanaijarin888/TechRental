"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { generatePromptPayPayload } from "@/lib/promptpay";
import { formatTHB } from "@/lib/utils";
import { QrCode, Upload, CheckCircle2, Copy, Check, Download, AlertCircle, Sparkles } from "lucide-react";

interface PromptPayModalProps {
  amount: number;
  orderNumber?: string;
  onPaymentComplete: (slipUrl: string, paymentReference: string, isMock: boolean) => void;
  onCancel?: () => void;
}

export default function PromptPayModal({
  amount,
  orderNumber = "TR-2026",
  onPaymentComplete,
  onCancel,
}: PromptPayModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [slipImage, setSlipImage] = useState<string>("");
  const [slipFileName, setSlipFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refNumber] = useState(`REF-${Date.now().toString().slice(-8)}`);

  const promptpayAccount = "081-234-5678";

  useEffect(() => {
    try {
      const payload = generatePromptPayPayload("0812345678", amount);
      QRCode.toDataURL(payload, {
        width: 280,
        margin: 2,
        color: {
          dark: "#0a2540",
          light: "#ffffff",
        },
      }).then((url) => {
        setQrDataUrl(url);
      });
    } catch (e) {
      console.error(e);
    }
  }, [amount]);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("0812345678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSlipFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitSlip = () => {
    if (!slipImage) return;
    setIsSubmitting(true);
    onPaymentComplete(slipImage, refNumber, false);
  };

  const handleMockInstantPay = () => {
    setIsSubmitting(true);
    // Mock payment slip placeholder
    const mockSlip = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80";
    onPaymentComplete(mockSlip, `MOCK-PAY-${Date.now()}`, true);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl max-w-lg mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 text-center relative">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md mb-3">
          <QrCode className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold">ชำระเงินผ่าน QR PromptPay</h3>
        <p className="text-xs text-blue-100 mt-1">
          สแกนจ่ายได้ทุกแอปธนาคารไทย (พร้อมเพย์)
        </p>
        <div className="mt-3 inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-base font-black tracking-wide">
          ยอดชำระ: {formatTHB(amount)}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="PromptPay QR Code"
                className="w-56 h-56 object-contain"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-gray-100 text-xs text-gray-400">
                กำลังสร้าง QR Code...
              </div>
            )}
            <div className="mt-2 text-center">
              <span className="text-[11px] font-bold text-blue-900 tracking-wider">
                THAI QR PAYMENT
              </span>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-4 w-full text-xs space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200">
              <div>
                <span className="text-gray-500 text-[11px]">หมายเลขพร้อมเพย์:</span>
                <p className="font-bold text-gray-900">{promptpayAccount} (บจก. เทคเรนท์ ฮับ)</p>
              </div>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "คัดลอกแล้ว" : "คัดลอก"}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
              <span>เลขอ้างอิงรายการ:</span>
              <span className="font-mono font-bold text-gray-700">{refNumber}</span>
            </div>
          </div>
        </div>

        {/* Upload Slip Section */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-800">
            แนบหลักฐานการโอนเงิน (Slip Upload)
          </label>

          <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-4 text-center transition bg-gray-50/50 relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {slipImage ? (
              <div className="space-y-2">
                <img
                  src={slipImage}
                  alt="Slip preview"
                  className="max-h-40 mx-auto rounded-xl shadow-sm border border-gray-200 object-contain"
                />
                <p className="text-xs font-medium text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> เลือกไฟล์: {slipFileName}
                </p>
                <span className="text-[10px] text-gray-400">คลิกเพื่อเปลี่ยนรูปสลิป</span>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-7 h-7 mx-auto text-gray-400" />
                <p className="text-xs font-medium text-gray-700">
                  คลิกเพื่อเลือกรูป หรือลากไฟล์สลิปมาวางที่นี่
                </p>
                <p className="text-[10px] text-gray-400">รองรับไฟล์ JPG, PNG (สูงสุด 5MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleSubmitSlip}
            disabled={!slipImage || isSubmitting}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isSubmitting ? "กำลังส่งหลักฐาน..." : "ยืนยันและส่งสลิปโอนเงิน"}
          </button>

          {/* Quick Mock Gateway button for instant testing! */}
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleMockInstantPay}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              จำลองชำระเงินสำเร็จทันที (Mock Gateway Instant Success)
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-1">
              * ฟังก์ชันจำลองเพื่อความสะดวกในการทดสอบ Flow ทั้งหมดโดยไม่ต้องโอนจริง
            </p>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition"
            >
              ยกเลิก / ชำระภายหลัง
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
