import { NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const baseUrl = getBaseUrl(req);

  if (!clientId) {
    return NextResponse.redirect(new URL("/auth/login?error=google_not_configured", baseUrl));
  }

  const redirectUri = `${baseUrl}/api/auth/google/callback`;
  const state = Math.random().toString(36).substring(2);

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("access_type", "online");
  googleUrl.searchParams.set("prompt", "select_account");
  googleUrl.searchParams.set("state", state);

  return NextResponse.redirect(googleUrl.toString());
}
