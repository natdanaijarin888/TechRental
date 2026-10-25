import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";
import { sendNotification } from "@/lib/notification";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Only admins and staff can process refunds" }, { status: 403 });
    }

    const { refundSlipUrl, refundBankName, refundBankAccount } = await req.json();

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.orderId },
      include: { inspection: true, assignedAsset: true, customer: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const calculatedRefund = order.inspection?.finalRefundAmount && order.inspection.finalRefundAmount > 0
      ? order.inspection.finalRefundAmount
      : Math.max(0, order.depositAmount - (order.inspection?.totalDeductions || 0));

    // Update inspection record
    const updatedInspection = await prisma.rentalInspection.upsert({
      where: { rentalOrderId: order.id },
      update: {
        refundStatus: "REFUNDED",
        refundSlipUrl: refundSlipUrl || null,
        refundBankName: refundBankName || "พร้อมเพย์ (PromptPay)",
        refundBankAccount: refundBankAccount || order.customer.phone || "-",
        refundPaidAt: new Date(),
        refundProcessedBy: `${session.name} (${session.role})`,
        finalRefundAmount: calculatedRefund,
        checkinDate: order.inspection?.checkinDate || new Date(),
        checkinStaffName: order.inspection?.checkinStaffName || `${session.name} (${session.role})`,
      },
      create: {
        rentalOrderId: order.id,
        originalDeposit: order.depositAmount,
        finalRefundAmount: calculatedRefund,
        refundStatus: "REFUNDED",
        refundSlipUrl: refundSlipUrl || null,
        refundBankName: refundBankName || "พร้อมเพย์ (PromptPay)",
        refundBankAccount: refundBankAccount || order.customer.phone || "-",
        refundPaidAt: new Date(),
        refundProcessedBy: `${session.name} (${session.role})`,
        checkinDate: new Date(),
        checkinStaffName: `${session.name} (${session.role})`,
      },
    });

    // Mark order as COMPLETED
    await prisma.rentalOrder.update({
      where: { id: order.id },
      data: {
        status: "COMPLETED",
      },
    });

    // Free asset back to AVAILABLE if not damaged
    if (order.assignedAssetId && order.assignedAsset?.status !== "DAMAGED") {
      await prisma.assetItem.update({
        where: { id: order.assignedAssetId },
        data: { status: "AVAILABLE" },
      });
    }

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "PROCESS_REFUND",
      entityType: "ORDER",
      entityId: order.id,
      details: `โอนคืนเงินมัดจำจำนวน ฿${updatedInspection.finalRefundAmount} เข้าบัญชี ${refundBankName || "PromptPay"} ${refundBankAccount || ""} สำหรับคำสั่งเช่า ${order.orderNumber}`,
    });

    await sendNotification({
      userId: order.customerId,
      title: `โอนคืนเงินมัดจำคำสั่งเช่า ${order.orderNumber} เรียบร้อยแล้ว`,
      message: `โอนคืนเงินมัดจำสุทธิจำนวน ฿${updatedInspection.finalRefundAmount} เข้าบัญชีของคุณแล้ว สามารถตรวจสอบหลักฐานการโอนได้ที่หน้ารายละเอียดคำสั่งเช่า`,
      type: "SUCCESS",
      link: `/orders/${order.id}/receipt`,
      channel: "EMAIL_SIMULATED",
    });

    return NextResponse.json({ success: true, inspection: updatedInspection });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
