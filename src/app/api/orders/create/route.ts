import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { checkProductDateRangeAvailability } from "@/lib/overlap-engine";
import { calculateRentalPricing } from "@/lib/pricing-engine";
import { logAuditAction } from "@/lib/audit";
import { sendNotification } from "@/lib/notification";

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อนทำการจอง" }, { status: 401 });
    }

    const body = await req.json();
    const {
      productId,
      startDate: startStr,
      endDate: endStr,
      paymentMethod = "PROMPTPAY",
      paymentSlipUrl,
      paymentReference,
      deliveryAddress,
      customerNotes,
      termsAccepted,
    } = body;

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "กรุณายอมรับเงื่อนไขและสัญญาเช่าดิจิทัลก่อนดำเนินการ" },
        { status: 400 }
      );
    }

    const startDate = new Date(startStr);
    const endDate = new Date(endStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: "รูปแบบวันที่ไม่ถูกต้อง" }, { status: 400 });
    }

    if (endDate < startDate) {
      return NextResponse.json(
        { error: "วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json({ error: "ไม่พบข้อมูลสินค้าที่ต้องการเช่า" }, { status: 404 });
    }

    // 1. OVERLAP PREVENTION CHECK
    const availability = await checkProductDateRangeAvailability(productId, startDate, endDate);
    if (!availability.isAvailable) {
      return NextResponse.json(
        {
          error:
            availability.conflictReason ||
            "อุปกรณ์รุ่นนี้ถูกจองเต็มแล้วในช่วงวันดังกล่าว กรุณาเลือกช่วงวันอื่น",
          availability,
        },
        { status: 409 }
      );
    }

    // 2. PRICING ENGINE CALCULATION
    const pricing = calculateRentalPricing(
      startDate,
      endDate,
      product.dailyRate,
      product.depositAmount,
      product.weeklyRate
    );

    // 3. GENERATE UNIQUE ORDER NUMBER
    const datePrefix = new Date().toISOString().slice(0, 7).replace("-", "");
    const count = await prisma.rentalOrder.count();
    const orderNumber = `TR-${datePrefix}-${String(count + 1).padStart(4, "0")}`;

    const isMockInstantPay = paymentMethod === "MOCK_GATEWAY";

    const order = await prisma.rentalOrder.create({
      data: {
        orderNumber,
        customerId: session.id,
        productId,
        startDate,
        endDate,
        totalDays: pricing.totalDays,
        dailyRate: pricing.dailyRate,
        rentTotal: pricing.rentTotal,
        depositAmount: pricing.depositAmount,
        discountAmount: pricing.discountAmount,
        grandTotal: pricing.grandTotal,
        status: isMockInstantPay ? "APPROVED" : "PENDING",
        paymentStatus: isMockInstantPay ? "VERIFIED" : (paymentSlipUrl ? "PENDING" : "PENDING"),
        paymentMethod,
        paymentSlipUrl: paymentSlipUrl || null,
        paymentReference: paymentReference || `REF-${Date.now()}`,
        paidAt: paymentSlipUrl || isMockInstantPay ? new Date() : null,
        termsAccepted: true,
        termsAcceptedAt: new Date(),
        deliveryAddress: deliveryAddress || session.kycStatus,
        customerNotes: customerNotes || null,
      },
    });

    // Auto-create inspection record
    await prisma.rentalInspection.create({
      data: {
        rentalOrderId: order.id,
        originalDeposit: pricing.depositAmount,
        refundStatus: "PENDING",
      },
    });

    // 4. AUDIT LOG
    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "CREATE_BOOKING",
      entityType: "ORDER",
      entityId: order.id,
      details: `สร้างคำสั่งเช่า ${orderNumber} สินค้า: ${product.name} ยอดสุทธิ ฿${pricing.grandTotal} (${pricing.totalDays} วัน)`,
    });

    // 5. NOTIFICATION
    await sendNotification({
      userId: session.id,
      title: `สร้างคำสั่งเช่า ${orderNumber} สำเร็จ`,
      message: `ยอดรวมค่าเช่าและเงินมัดจำ ฿${pricing.grandTotal} เจ้าหน้าที่จะทำการตรวจสอบและส่งมอบอุปกรณ์ตามวันที่กำหนด`,
      type: "SUCCESS",
      link: `/orders`,
      channel: "IN_APP",
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
