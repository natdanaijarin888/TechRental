import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendNotification } from "@/lib/notification";
import { logAuditAction } from "@/lib/audit";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            kycStatus: true,
            emergencyContactName: true,
            emergencyContactPhone: true,
          },
        },
        assignedAsset: true,
        inspection: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Ensure customer only accesses their own order
    if (session.role === "CUSTOMER" && order.customerId !== session.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, returnMethod, returnTrackingNo, notes, additionalDays, issueCategory, issueDetails, urgency } = body;

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.id },
      include: { customer: true, product: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (session.role === "CUSTOMER" && order.customerId !== session.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (action === "CANCEL") {
      if (order.status !== "PENDING") {
        return NextResponse.json(
          { error: "สามารถยกเลิกได้เฉพาะคำสั่งเช่าที่อยู่ในสถานะรอตรวจสอบเท่านั้น" },
          { status: 400 }
        );
      }

      const updated = await prisma.rentalOrder.update({
        where: { id: params.id },
        data: { status: "CANCELLED" },
      });

      return NextResponse.json({ success: true, order: updated });
    }

    if (action === "NOTIFY_RETURN") {
      const returnNote = `[ลูกค้าแจ้งส่งคืน: ${returnMethod || "คืนหน้าร้าน"}] เลขพัสดุ: ${returnTrackingNo || "ไม่มี"} (${notes || ""})`;

      const updated = await prisma.rentalOrder.update({
        where: { id: params.id },
        data: {
          status: "RETURNED",
          customerNotes: order.customerNotes ? `${order.customerNotes} | ${returnNote}` : returnNote,
        },
      });

      // Notify Admins
      const admins = await prisma.user.findMany({ where: { role: { in: ["ADMIN", "STAFF"] } } });
      for (const admin of admins) {
        await sendNotification({
          userId: admin.id,
          title: `📦 ลูกค้าแจ้งส่งคืนอุปกรณ์ (${order.orderNumber})`,
          message: `ลูกค้า ${order.customer.name} แจ้งส่งคืน: ${returnMethod || "คืนหน้าร้าน"} ${returnTrackingNo ? "เลข: " + returnTrackingNo : ""}`,
          type: "INFO",
          link: `/admin/inspections`,
        });
      }

      return NextResponse.json({ success: true, order: updated });
    }

    if (action === "EXTEND") {
      if (order.status !== "ACTIVE" && order.status !== "APPROVED") {
        return NextResponse.json(
          { error: "สามารถขอขยายเวลาเช่าได้เฉพาะคำสั่งเช่าที่กำลังใช้งานอยู่เท่านั้น" },
          { status: 400 }
        );
      }

      const days = parseInt(additionalDays, 10);
      if (isNaN(days) || days <= 0) {
        return NextResponse.json(
          { error: "กรุณาระบุจำนวนวันที่ต้องการขยายเวลาให้ถูกต้อง (อย่างน้อย 1 วัน)" },
          { status: 400 }
        );
      }

      const extraRent = days * order.dailyRate;
      const currentEndDate = new Date(order.endDate);
      const newEndDate = new Date(currentEndDate.getTime() + days * 24 * 60 * 60 * 1000);
      const newTotalDays = order.totalDays + days;
      const newRentTotal = order.rentTotal + extraRent;
      const newGrandTotal = order.grandTotal + extraRent;

      const extendNote = `[ขยายเวลาเช่า +${days} วัน] กำหนดคืนใหม่: ${newEndDate.toLocaleDateString("th-TH")} (ค่าเช่าเพิ่ม ฿${extraRent})`;

      const updated = await prisma.rentalOrder.update({
        where: { id: params.id },
        data: {
          endDate: newEndDate,
          totalDays: newTotalDays,
          rentTotal: newRentTotal,
          grandTotal: newGrandTotal,
          customerNotes: order.customerNotes ? `${order.customerNotes} | ${extendNote}` : extendNote,
        },
      });

      await logAuditAction({
        userId: session.id,
        userName: session.name,
        userRole: session.role,
        action: "UPDATE_ORDER",
        entityType: "ORDER",
        entityId: order.id,
        details: `ขยายระยะเวลาเช่าคำสั่ง ${order.orderNumber} เพิ่ม ${days} วัน กำหนดคืนใหม่ ${newEndDate.toLocaleDateString("th-TH")} ยอดเพิ่ม ฿${extraRent}`,
      });

      await sendNotification({
        userId: order.customerId,
        title: `ขยายระยะเวลาเช่า ${order.orderNumber} สำเร็จ`,
        message: `ขยายเวลาเช่าเพิ่ม ${days} วัน เรียบร้อยแล้ว กำหนดส่งคืนใหม่คือ ${newEndDate.toLocaleDateString("th-TH")} (ยอดเช่าเพิ่มเติม ฿${extraRent})`,
        type: "SUCCESS",
        link: `/orders`,
      });

      const admins = await prisma.user.findMany({ where: { role: { in: ["ADMIN", "STAFF"] } } });
      for (const admin of admins) {
        await sendNotification({
          userId: admin.id,
          title: `⏱️ คำสั่งเช่า ${order.orderNumber} ขยายเวลาเช่า`,
          message: `ลูกค้า ${order.customer.name} ขยายเวลาเช่าเพิ่ม ${days} วัน สิ้นสุดใหม่วันที่ ${newEndDate.toLocaleDateString("th-TH")}`,
          type: "INFO",
          link: `/admin/orders`,
        });
      }

      return NextResponse.json({ success: true, order: updated, extraRent, newEndDate });
    }

    if (action === "REPORT_ISSUE") {
      if (!issueCategory || !issueDetails) {
        return NextResponse.json(
          { error: "กรุณาระบุหัวข้อปัญหาและรายละเอียดให้ครบถ้วน" },
          { status: 400 }
        );
      }

      const issueNote = `[⚠️ แจ้งปัญหา: ${issueCategory} (ระดับ: ${urgency || "ปกติ"})] ${issueDetails}`;

      const updated = await prisma.rentalOrder.update({
        where: { id: params.id },
        data: {
          customerNotes: order.customerNotes ? `${order.customerNotes} | ${issueNote}` : issueNote,
        },
      });

      await logAuditAction({
        userId: session.id,
        userName: session.name,
        userRole: session.role,
        action: "REPORT_ISSUE",
        entityType: "ORDER",
        entityId: order.id,
        details: `แจ้งปัญหาคำสั่งเช่า ${order.orderNumber}: [${issueCategory}] ${issueDetails}`,
      });

      await sendNotification({
        userId: order.customerId,
        title: `ได้รับแจ้งปัญหาคำสั่งเช่า ${order.orderNumber} แล้ว`,
        message: `เรื่อง: ${issueCategory} เจ้าหน้าที่ทีม Support ได้รับเรื่องแล้วและจะติดต่อกลับโดยเร็วที่สุด`,
        type: "WARNING",
        link: `/orders`,
      });

      const admins = await prisma.user.findMany({ where: { role: { in: ["ADMIN", "STAFF"] } } });
      for (const admin of admins) {
        await sendNotification({
          userId: admin.id,
          title: `🚨 ลูกค้าแจ้งปัญหาการใช้งาน (${order.orderNumber})`,
          message: `[${issueCategory} - ${urgency || "ปกติ"}] ${issueDetails} (ลูกค้า: ${order.customer.name})`,
          type: "DANGER",
          link: `/admin/orders`,
        });
      }

      return NextResponse.json({ success: true, order: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
