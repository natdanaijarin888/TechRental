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

    const { action, rejectReason } = await req.json(); // action: "APPROVE" | "REJECT"

    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isApproved = action === "APPROVE";
    const newStatus = isApproved ? "APPROVED" : "REJECTED";

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        kycStatus: newStatus,
        kycRejectReason: isApproved ? null : (rejectReason || "ข้อมูลหรือรูปถ่ายเอกสารไม่ชัดเจน"),
        kycVerifiedAt: isApproved ? new Date() : null,
      },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: isApproved ? "APPROVE_KYC" : "REJECT_KYC",
      entityType: "USER",
      entityId: targetUser.id,
      details: isApproved
        ? `อนุมัติเอกสารยืนยันตัวตน KYC ให้กับผู้ใช้: ${targetUser.name} (${targetUser.email})`
        : `ปฏิเสธเอกสาร KYC ของผู้ใช้: ${targetUser.name} เหตุผล: ${rejectReason}`,
    });

    await sendNotification({
      userId: targetUser.id,
      title: isApproved ? "เอกสาร KYC ของคุณผ่านการอนุมัติแล้ว!" : "เอกสาร KYC ไม่ผ่านการอนุมัติ",
      message: isApproved
        ? "ยินดีด้วย บัญชีของคุณได้รับการยืนยันตัวตนเรียบร้อย สามารถเช่าอุปกรณ์ไอทีทุกรายการได้ทันที"
        : `เอกสารของคุณถูกปฏิเสธเนื่องจาก: ${rejectReason || "ข้อมูลไม่ชัดเจน"} กรุณาอัปโหลดใหม่ที่หน้าโปรไฟล์`,
      type: isApproved ? "SUCCESS" : "DANGER",
      link: "/profile/kyc",
      channel: "EMAIL_SIMULATED",
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
