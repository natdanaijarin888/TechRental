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
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { checkoutNotes, checkoutImages, checkoutDate } = await req.json();

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.orderId },
      include: { assignedAsset: true, customer: true, product: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.assignedAssetId) {
      return NextResponse.json(
        { error: "กรุณาระบุ Serial Number เครื่องก่อนทำการ Check-out ส่งมอบ" },
        { status: 400 }
      );
    }

    const imagesStr = Array.isArray(checkoutImages)
      ? JSON.stringify(checkoutImages)
      : checkoutImages || "[]";

    // Upsert inspection record
    const inspection = await prisma.rentalInspection.upsert({
      where: { rentalOrderId: order.id },
      create: {
        rentalOrderId: order.id,
        checkoutDate: checkoutDate ? new Date(checkoutDate) : new Date(),
        checkoutStaffName: `${session.name} (${session.role})`,
        checkoutNotes: checkoutNotes || "ตรวจสภาพก่อนส่งมอบเรียบร้อย",
        checkoutImages: imagesStr,
        originalDeposit: order.depositAmount,
        refundStatus: "PENDING",
      },
      update: {
        checkoutDate: checkoutDate ? new Date(checkoutDate) : new Date(),
        checkoutStaffName: `${session.name} (${session.role})`,
        checkoutNotes: checkoutNotes || "ตรวจสภาพก่อนส่งมอบเรียบร้อย",
        checkoutImages: imagesStr,
      },
    });

    // Update order status to ACTIVE (In-use)
    await prisma.rentalOrder.update({
      where: { id: order.id },
      data: {
        status: "ACTIVE",
      },
    });

    // Ensure asset is marked as RENTED
    await prisma.assetItem.update({
      where: { id: order.assignedAssetId },
      data: { status: "RENTED", lastInspectedAt: new Date() },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "CHECKOUT_DELIVERY",
      entityType: "INSPECTION",
      entityId: order.id,
      details: `Check-out ส่งมอบเครื่อง ${order.product.name} (S/N: ${order.assignedAsset?.serialNumber}) ให้กับลูกค้า ${order.customer.name}`,
    });

    await sendNotification({
      userId: order.customerId,
      title: `อุปกรณ์สำหรับคำสั่งเช่า ${order.orderNumber} ได้ส่งมอบแล้ว`,
      message: `คุณได้รับเครื่อง ${order.product.name} (S/N: ${order.assignedAsset?.serialNumber}) กำลังอยู่ในสถานะใช้งานจนถึง ${order.endDate.toLocaleDateString("th-TH")}`,
      type: "SUCCESS",
      link: "/orders",
      channel: "LINE_SIMULATED",
    });

    return NextResponse.json({ success: true, inspection });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
