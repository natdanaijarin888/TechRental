import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";
import { sendNotification } from "@/lib/notification";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { paymentSlipUrl, paymentReference, paymentMethod } = await req.json();

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.id },
    });

    if (!order) {
      return NextResponse.json({ error: "ไม่พบคำสั่งเช่า" }, { status: 404 });
    }

    if (session.role === "CUSTOMER" && order.customerId !== session.id) {
      return NextResponse.json({ error: "ไม่มีสิทธิ์ทำรายการนี้" }, { status: 403 });
    }

    const isMock = paymentMethod === "MOCK_GATEWAY";

    const updated = await prisma.rentalOrder.update({
      where: { id: params.id },
      data: {
        paymentSlipUrl: paymentSlipUrl || order.paymentSlipUrl,
        paymentReference: paymentReference || order.paymentReference,
        paymentMethod: paymentMethod || order.paymentMethod,
        paidAt: new Date(),
        paymentStatus: isMock ? "VERIFIED" : "PENDING",
        status: isMock ? "APPROVED" : order.status,
      },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: isMock ? "MOCK_PAYMENT_SUCCESS" : "UPLOAD_PAYMENT_SLIP",
      entityType: "ORDER",
      entityId: order.id,
      details: isMock
        ? `ชำระเงินสำเร็จผ่าน Mock Gateway สำหรับออร์เดอร์ ${order.orderNumber}`
        : `แนบสลิปโอนเงิน PromptPay สำหรับออร์เดอร์ ${order.orderNumber} (Ref: ${paymentReference})`,
    });

    await sendNotification({
      userId: session.id,
      title: isMock ? "ชำระเงินสำเร็จแล้ว" : "ส่งหลักฐานการชำระเงินแล้ว",
      message: isMock
        ? `คำสั่งเช่า ${order.orderNumber} ได้รับการอนุมัติการชำระเงินแล้ว รอจัดส่งมอบอุปกรณ์`
        : `คำสั่งเช่า ${order.orderNumber} เจ้าหน้าที่กำลังตรวจสอบยอดเงินในสลิป`,
      type: "SUCCESS",
      link: `/orders`,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
