import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { calculateInspectionRefund } from "@/lib/pricing-engine";
import { logAuditAction } from "@/lib/audit";
import { sendNotification } from "@/lib/notification";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const {
      checkinDate: checkinDateInput,
      checkinNotes,
      checkinImages,
      damageFee = 0,
      damageDescription,
    } = await req.json();

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.orderId },
      include: { assignedAsset: true, customer: true, product: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const actualReturnDate = checkinDateInput ? new Date(checkinDateInput) : new Date();

    // Calculate fines & refund
    const refundCalc = calculateInspectionRefund(
      order.endDate,
      actualReturnDate,
      order.dailyRate,
      order.depositAmount,
      parseFloat(damageFee || 0)
    );

    const imagesStr = Array.isArray(checkinImages)
      ? JSON.stringify(checkinImages)
      : checkinImages || "[]";

    const inspection = await prisma.rentalInspection.upsert({
      where: { rentalOrderId: order.id },
      create: {
        rentalOrderId: order.id,
        checkinDate: actualReturnDate,
        checkinStaffName: `${session.name} (${session.role})`,
        checkinNotes: checkinNotes || "ตรวจรับคืนอุปกรณ์เรียบร้อย",
        checkinImages: imagesStr,
        overdueDays: refundCalc.overdueDays,
        lateFeePerDay: refundCalc.lateFeePerDay,
        totalLateFee: refundCalc.totalLateFee,
        damageFee: refundCalc.damageFee,
        damageDescription: damageDescription || null,
        originalDeposit: refundCalc.originalDeposit,
        totalDeductions: refundCalc.totalDeductions,
        finalRefundAmount: refundCalc.finalRefundAmount,
        refundStatus: "PENDING",
      },
      update: {
        checkinDate: actualReturnDate,
        checkinStaffName: `${session.name} (${session.role})`,
        checkinNotes: checkinNotes || "ตรวจรับคืนอุปกรณ์เรียบร้อย",
        checkinImages: imagesStr,
        overdueDays: refundCalc.overdueDays,
        lateFeePerDay: refundCalc.lateFeePerDay,
        totalLateFee: refundCalc.totalLateFee,
        damageFee: refundCalc.damageFee,
        damageDescription: damageDescription || null,
        originalDeposit: refundCalc.originalDeposit,
        totalDeductions: refundCalc.totalDeductions,
        finalRefundAmount: refundCalc.finalRefundAmount,
        refundStatus: "PENDING",
      },
    });

    // Update order status to RETURNED (รอตรวจ/คืนมัดจำ)
    await prisma.rentalOrder.update({
      where: { id: order.id },
      data: {
        status: "RETURNED",
      },
    });

    // If damaged, update asset status to DAMAGED
    if (order.assignedAssetId && refundCalc.damageFee > 0) {
      await prisma.assetItem.update({
        where: { id: order.assignedAssetId },
        data: {
          status: "DAMAGED",
          conditionNotes: damageDescription || "พบความเสียหายหลังส่งคืน",
          lastInspectedAt: new Date(),
        },
      });
    }

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "CHECKIN_INSPECT",
      entityType: "INSPECTION",
      entityId: order.id,
      details: `Check-in ตรวจรับคืนเครื่อง ${order.orderNumber} เกินกำหนด ${refundCalc.overdueDays} วัน (ค่าปรับส่งช้า ฿${refundCalc.totalLateFee}, ค่าชำรุด ฿${refundCalc.damageFee}, เงินมัดจำคืนสุทธิ ฿${refundCalc.finalRefundAmount})`,
    });

    await sendNotification({
      userId: order.customerId,
      title: `ตรวจรับคืนอุปกรณ์คำสั่งเช่า ${order.orderNumber} แล้ว`,
      message: `ตรวจรับคืนเรียบร้อย ค่าปรับล่าช้า: ฿${refundCalc.totalLateFee}, ค่าชำรุด: ฿${refundCalc.damageFee}, ยอดเงินมัดจำที่จะโอนคืน: ฿${refundCalc.finalRefundAmount}`,
      type: "INFO",
      link: "/orders",
      channel: "LINE_SIMULATED",
    });

    return NextResponse.json({ success: true, inspection, refundCalc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
