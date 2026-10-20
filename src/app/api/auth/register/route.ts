import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signToken, SessionUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, address, emergencyContactName, emergencyContactPhone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อ, อีเมล และรหัสผ่าน" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "อีเมลนี้ถูกใช้งานแล้วในระบบ" },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        passwordHash,
        role: "CUSTOMER",
        phone: phone || null,
        address: address || null,
        emergencyContactName: emergencyContactName || null,
        emergencyContactPhone: emergencyContactPhone || null,
        kycStatus: "UNSUBMITTED",
      },
    });

    const sessionUser: SessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: "CUSTOMER",
      kycStatus: "UNSUBMITTED",
    };

    const token = signToken(sessionUser);

    await logAuditAction({
      userId: user.id,
      userName: user.name,
      userRole: "CUSTOMER",
      action: "USER_REGISTER",
      entityType: "USER",
      entityId: user.id,
      details: `สมัครสมาชิกบัญชีผู้ใช้ใหม่: ${user.email}`,
    });

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    response.cookies.set("techrent_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 3600,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "เกิดข้อผิดพลาดในการลงทะเบียน" },
      { status: 500 }
    );
  }
}
