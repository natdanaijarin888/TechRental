import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      emergencyContactName: true,
      emergencyContactPhone: true,
      kycStatus: true,
      kycIdCardImage: true,
      kycStudentIdImage: true,
      kycRejectReason: true,
      kycVerifiedAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user });
}
