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
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { action, rejectReason } = await req.json(); // action: "APPROVE_PAYMENT" | "REJECT_PAYMENT" | "CANCEL_ORDER"

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.id },
      include: { customer: true, product: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let updateData: any = {};
    let auditMessage = "";
    let notifTitle = "";
    let notifMessage = "";
    let notifType: "SUCCESS" | "WARNING" | "DANGER" = "SUCCESS";

    if (action === "APPROVE_PAYMENT") {
      updateData = {
        paymentStatus: "VERIFIED",
        status: "APPROVED",
        paymentVerifiedAt: new Date(),
        paymentVerifiedBy: `${session.name} (${session.role})`,
      };
      auditMessage = `ตรวจสอบและอนุมัติการชำระเงินคำสั่งเช่า ${order.orderNumber} ยอดเงิน ฿${order.grandTotal}`;
      notifTitle = `การชำระเงินคำสั่งเช่า ${order.orderNumber} ได้รับการอนุมัติแล้ว`;
      notifMessage = `เจ้าหน้าที่ได้ยืนยันยอดชำระเงินเรียบร้อยแล้ว ออร์เดอร์อยู่ในขั้นตอนเตรียมจัดส่ง/ส่งมอบเครื่อง`;
      notifType = "SUCCESS";
    } else if (action === "REJECT_PAYMENT") {
      updateData = {
        paymentStatus: "REJECTED",
        adminNotes: rejectReason || "สลิปโอนเงินไม่ถูกต้องหรือไม่มียอดเงินเข้า",
      };
      auditMessage = `ปฏิเสธสลิปการชำระเงินของคำสั่งเช่า ${order.orderNumber} เหตุผล: ${rejectReason}`;
      notifTitle = `สลิปการโอนเงินของคำสั่งเช่า ${order.orderNumber} ไม่ถูกต้อง`;
      notifMessage = `กรุณาตรวจสอบยอดเงินและแนบสลิปใหม่ที่ถูกต้องในหน้ารายละเอียดคำสั่งเช่า (${rejectReason || "ข้อมูลไม่ตรงกัน"})`;
      notifType = "DANGER";
    } else if (action === "CANCEL_ORDER") {
      updateData = {
        status: "CANCELLED",
        adminNotes: rejectReason || "ยกเลิกคำสั่งเช่าโดยเจ้าหน้าที่",
      };
      // Free asset if assigned
      if (order.assignedAssetId) {
        await prisma.assetItem.update({
          where: { id: order.assignedAssetId },
          data: { status: "AVAILABLE" },
        });
      }
      auditMessage = `ยกเลิกคำสั่งเช่า ${order.orderNumber} เหตุผล: ${rejectReason}`;
      notifTitle = `คำสั่งเช่า ${order.orderNumber} ถูกยกเลิก`;
      notifMessage = `คำสั่งเช่าของคุณถูกยกเลิกแล้ว: ${rejectReason || "โปรดติดต่อเจ้าหน้าที่"}`;
      notifType = "WARNING";
    }

    const updated = await prisma.rentalOrder.update({
      where: { id: params.id },
      data: updateData,
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: `ORDER_${action}`,
      entityType: "ORDER",
      entityId: order.id,
      details: auditMessage,
    });

    await sendNotification({
      userId: order.customerId,
      title: notifTitle,
      message: notifMessage,
      type: notifType,
      link: "/orders",
      channel: "LINE_SIMULATED",
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
