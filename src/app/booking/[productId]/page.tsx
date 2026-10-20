"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  QrCode,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { formatTHB } from "@/lib/utils";
import { calculateRentalPricing } from "@/lib/pricing-engine";
import PromptPayModal from "@/components/PromptPayModal";
import DigitalContractModal from "@/components/DigitalContractModal";

function BookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = params.productId as string;

  const [product, setProduct] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);

  const initialStart = searchParams.get("start") || tomorrow.toISOString().split("T")[0];
  const initialEnd = searchParams.get("end") || threeDaysLater.toISOString().split("T")[0];

  const [startDateStr, setStartDateStr] = useState(initialStart);
  const [endDateStr, setEndDateStr] = useState(initialEnd);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  // Payment method & state
  const [paymentMethod, setPaymentMethod] = useState<"PROMPTPAY" | "MOCK_GATEWAY">("PROMPTPAY");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");

  // Fetch product and current user
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, userRes] = await Promise.all([
          fetch(`/api/products/${productId}`),
          fetch(`/api/auth/me`),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProduct(prodData.product);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentUser(userData.user);
          if (userData.user?.address) {
            setDeliveryAddress(userData.user.address);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Check date range availability when dates change
  useEffect(() => {
    if (!startDateStr || !endDateStr || !productId) return;
    const checkAvailability = async () => {
      try {
        const res = await fetch(
          `/api/products/${productId}/availability?startDate=${startDateStr}&endDate=${endDateStr}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.rangeCheck && !data.rangeCheck.isAvailable) {
            setAvailabilityError(
              data.rangeCheck.conflictReason || "สินค้าถูกจองเต็มแล้วในช่วงวันที่เลือก"
            );
          } else {
            setAvailabilityError("");
          }
        }
      } catch {
        // silent
      }
    };

    checkAvailability();
  }, [startDateStr, endDateStr, productId]);

  // Pricing calculation
  const pricing = product
    ? calculateRentalPricing(
        startDateStr,
        endDateStr,
        product.dailyRate,
        product.depositAmount,
        product.weeklyRate
      )
    : null;

  const handleCreateBookingWithPayment = async (
    slipUrl?: string,
    paymentReference?: string,
    isMockPay?: boolean
  ) => {
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("กรุณากดยอมรับเงื่อนไขและสัญญาเช่าดิจิทัลก่อนทำรายการ");
      return;
    }

    if (availabilityError) {
      setErrorMessage(availabilityError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          startDate: startDateStr,
          endDate: endDateStr,
          paymentMethod: isMockPay ? "MOCK_GATEWAY" : paymentMethod,
          paymentSlipUrl: slipUrl || null,
          paymentReference: paymentReference || null,
          deliveryAddress: deliveryAddress || currentUser.address || "รับที่ศูนย์บริการสยาม",
          customerNotes,
          termsAccepted: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "เกิดข้อผิดพลาดในการสร้างคำสั่งเช่า");
      } else {
        router.push("/orders");
      }
    } catch (e: any) {
      setErrorMessage(e.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">กำลังเตรียมข้อมูลการเช่า...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">ไม่พบสินค้า</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href={`/catalog/${productId}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับไปหน้ารายละเอียด {product.name}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Booking & Rental Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            ทำรายการจองและชำระเงิน
          </h1>
        </div>

        {currentUser && (
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <span>ผู้เช่า:</span>
            <span className="font-bold text-gray-900">{currentUser.name}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentUser.kycStatus === "APPROVED"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {currentUser.kycStatus === "APPROVED" ? "KYC ผ่านแล้ว" : "รอตรวจสอบ KYC"}
            </span>
          </div>
        )}
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {availabilityError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-bold">ระบบป้องกันการจองชนกัน (Overlap Prevention):</p>
            <p className="mt-0.5">{availabilityError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Selected Product Summary Card */}
          <div className="p-4 rounded-3xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 rounded-2xl object-cover border border-gray-100"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <h3 className="font-bold text-sm text-gray-900 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatTHB(product.dailyRate)} /วัน • มัดจำ {formatTHB(product.depositAmount)}
              </p>
            </div>
          </div>

          {/* 1. Date Range Picker */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              1. เลือกช่วงวันเช่าอุปกรณ์ (Date Range)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  วันที่เริ่มต้นเช่า
                </label>
                <input
                  type="date"
                  value={startDateStr}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDateStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  วันที่ส่งคืนอุปกรณ์
                </label>
                <input
                  type="date"
                  value={endDateStr}
                  min={startDateStr || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDateStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {pricing && (
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-center justify-between">
                <span>จำนวนระยะเวลาการเช่า:</span>
                <span className="font-black text-sm">{pricing.totalDays} วัน</span>
              </div>
            )}
          </div>

          {/* 2. Delivery Address & Notes */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900">
              2. ที่อยู่จัดส่ง หรือสถานที่รับอุปกรณ์
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                ที่อยู่จัดส่งอุปกรณ์
              </label>
              <textarea
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="ระบุที่อยู่จัดส่งอย่างละเอียด หรือระบุว่า 'รับที่ศูนย์บริการสาขาสยาม'"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                หมายเหตุเพิ่มเติมถึงเจ้าหน้าที่ (ถ้ามี)
              </label>
              <input
                type="text"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="เช่น ต้องการสายเคเบิลความยาวพิเศษ หรือต้องการใช้งานกับระบบ Windows"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Digital Contract Agreement */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              3. สัญญาเช่าดิจิทัล (Terms & Conditions)
            </h3>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-700 font-medium leading-relaxed">
                  ข้าพเจ้ายินยอมรับทราบและปฏิบัติตาม{" "}
                  <button
                    type="button"
                    onClick={() => setIsContractModalOpen(true)}
                    className="text-blue-600 hover:underline font-bold"
                  >
                    ข้อตกลงและสัญญาเช่าดิจิทัล
                  </button>{" "}
                  ว่าด้วยการดูแลรักษาอุปกรณ์ อัตราค่าปรับกรณีส่งคืนล่าช้า (วันละ 1.5 เท่า) และการหักกลบลบหนี้จากเงินประกันมัดจำ
                </label>
              </div>

              <div className="text-[11px] text-gray-400 pl-6">
                * การติ๊กยอมรับถือเป็นการลงลายมือชื่อดิจิทัลที่มีผลสมบูรณ์ตามกฎหมาย
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Engine & Payment QR / Mock (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pricing Engine Calculation Card */}
          {pricing && (
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900">
                สรุปยอดคำนวณราคาอัตโนมัติ (Pricing Engine)
              </h3>

              <div className="space-y-2 text-xs divide-y divide-gray-100">
                <div className="flex justify-between py-1.5 text-gray-600">
                  <span>
                    ค่าเช่ารายวัน ({formatTHB(pricing.dailyRate)} × {pricing.totalDays} วัน):
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatTHB(pricing.baseRent)}
                  </span>
                </div>

                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between py-1.5 text-emerald-600 font-semibold">
                    <span>ส่วนลดค่าเช่ารายสัปดาห์:</span>
                    <span>-{formatTHB(pricing.discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between py-1.5 text-gray-600">
                  <span>ค่าเช่ารวมสุทธิ:</span>
                  <span className="font-bold text-gray-900">{formatTHB(pricing.rentTotal)}</span>
                </div>

                <div className="flex justify-between py-1.5 text-gray-600">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    เงินประกัน / ค่ามัดจำ (ได้คืนหลังตรวจรับ):
                  </span>
                  <span className="font-bold text-amber-700">
                    {formatTHB(pricing.depositAmount)}
                  </span>
                </div>

                <div className="flex justify-between pt-3 text-sm">
                  <span className="font-black text-gray-900">ยอดรวมชำระสุทธิ:</span>
                  <span className="font-black text-xl text-blue-600">
                    {formatTHB(pricing.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* PromptPay QR & Slip Submission Widget */}
          {pricing && (
            <PromptPayModal
              amount={pricing.grandTotal}
              onPaymentComplete={(slip, ref, isMock) => {
                handleCreateBookingWithPayment(slip, ref, isMock);
              }}
            />
          )}
        </div>
      </div>

      {/* Digital Contract Modal */}
      <DigitalContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        onAccept={() => setTermsAccepted(true)}
        productName={product.name}
        dailyRate={product.dailyRate}
        depositAmount={product.depositAmount}
      />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-16 text-center text-gray-500">กำลังโหลดข้อมูลการจอง...</div>}>
      <BookingContent />
    </Suspense>
  );
}
