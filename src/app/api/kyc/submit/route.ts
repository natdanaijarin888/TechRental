import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";
import { sendNotification } from "@/lib/notification";

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อนทำรายการ" }, { status: 401 });
    }

    const {
      phone,
      address,
      emergencyContactName,
      emergencyContactPhone,
    } = await req.json();

    if (!phone || !address) {
      return NextResponse.json(
        { error: "กรุณาระบุเบอร์โทรศัพท์และที่อยู่จัดส่งให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.id },
      data: {
        phone: phone || undefined,
        address: address || undefined,
        emergencyContactName: emergencyContactName || undefined,
        emergencyContactPhone: emergencyContactPhone || undefined,
        kycStatus: "PENDING",
        kycRejectReason: null,
      },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "SUBMIT_KYC",
      entityType: "USER",
      entityId: session.id,
      details: "ส่งข้อมูลยืนยันตัวตนและข้อมูลติดต่อฉุกเฉินเพื่อรอเจ้าหน้าที่ตรวจสอบ",
    });

    // Notify user
    await sendNotification({
      userId: session.id,
      title: "ส่งข้อมูลยืนยันตัวตนเรียบร้อยแล้ว",
      message: "เจ้าหน้าที่จะทำการตรวจสอบข้อมูลติดต่อและที่อยู่จัดส่งของคุณภายใน 24 ชม.",
      type: "INFO",
      link: "/profile/kyc",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        kycStatus: updatedUser.kycStatus,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "เกิดข้อผิดพลาดในการส่งข้อมูล KYC" },
      { status: 500 }
    );
  }
}
