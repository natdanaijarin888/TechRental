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
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can process refunds" }, { status: 403 });
    }

    const { refundSlipUrl, refundBankName, refundBankAccount } = await req.json();

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.orderId },
      include: { inspection: true, assignedAsset: true, customer: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.inspection) {
      return NextResponse.json(
        { error: "ต้องทำการตรวจรับคืนเครื่อง (Check-in) ก่อนทำการคืนเงินมัดจำ" },
        { status: 400 }
      );
    }

    // Update inspection record
    const updatedInspection = await prisma.rentalInspection.update({
      where: { rentalOrderId: order.id },
      data: {
        refundStatus: "REFUNDED",
        refundSlipUrl: refundSlipUrl || null,
        refundBankName: refundBankName || "พร้อมเพย์ (PromptPay)",
        refundBankAccount: refundBankAccount || order.customer.phone || "-",
        refundPaidAt: new Date(),
        refundProcessedBy: `${session.name} (${session.role})`,
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
      details: `โอนคืนเงินมัดจำจำนวน ฿${order.inspection.finalRefundAmount} เข้าบัญชี ${refundBankName || "PromptPay"} ${refundBankAccount || ""} สำหรับคำสั่งเช่า ${order.orderNumber}`,
    });

    await sendNotification({
      userId: order.customerId,
      title: `โอนคืนเงินมัดจำคำสั่งเช่า ${order.orderNumber} เรียบร้อยแล้ว`,
      message: `โอนคืนเงินมัดจำสุทธิจำนวน ฿${order.inspection.finalRefundAmount} เข้าบัญชีของคุณแล้ว สามารถตรวจสอบหลักฐานการโอนได้ที่หน้ารายละเอียดคำสั่งเช่า`,
      type: "SUCCESS",
      link: `/orders/${order.id}/receipt`,
      channel: "EMAIL_SIMULATED",
    });

    return NextResponse.json({ success: true, inspection: updatedInspection });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
