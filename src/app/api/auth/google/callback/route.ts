import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, hashPassword, SessionUser, getBaseUrl } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const baseUrl = getBaseUrl(req);

  if (error || !code) {
    return NextResponse.redirect(new URL("/auth/login?error=google_cancelled", baseUrl));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/auth/login?error=google_not_configured", baseUrl));
  }

  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  try {
    // 1. แลกเปลี่ยน authorization code เป็น access token จาก Google
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Google token exchange failed:", errText);
      return NextResponse.redirect(new URL("/auth/login?error=google_auth_failed", baseUrl));
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. ดึงข้อมูล Profile ของผู้ใช้จาก Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      console.error("Google userinfo failed:", await userRes.text());
      return NextResponse.redirect(new URL("/auth/login?error=google_profile_failed", baseUrl));
    }

    const googleUser = await userRes.json();
    const email = (googleUser.email || "").toLowerCase().trim();
    const name = googleUser.name || googleUser.given_name || "Google User";

    if (!email) {
      return NextResponse.redirect(new URL("/auth/login?error=google_no_email", baseUrl));
    }

    // 3. ค้นหาผู้ใช้ในฐานข้อมูล หรือลงทะเบียนผู้ใช้ใหม่อัตโนมัติ
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // สร้างผู้ใช้ใหม่ด้วยสิทธิ์ CUSTOMER
      const randomPassword =
        Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashPassword(randomPassword),
          role: "CUSTOMER",
          kycStatus: "UNSUBMITTED",
        },
      });
    }

    const sessionUser: SessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as SessionUser["role"],
      kycStatus: user.kycStatus as SessionUser["kycStatus"],
    };

    const token = signToken(sessionUser);

    const destination =
      sessionUser.role === "ADMIN" || sessionUser.role === "STAFF"
        ? "/admin/dashboard"
        : "/catalog";

    const response = NextResponse.redirect(new URL(destination, baseUrl));

    response.cookies.set("techrent_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 3600,
    });

    return response;
  } catch (err: any) {
    console.error("Google OAuth callback exception:", err);
    return NextResponse.redirect(new URL("/auth/login?error=google_server_error", baseUrl));
  }
}
