import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const whereClause: any = {};

    // Customer can only view their own orders
    if (session.role === "CUSTOMER") {
      whereClause.customerId = session.id;
    }

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    const orders = await prisma.rentalOrder.findMany({
      where: whereClause,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            brand: true,
            model: true,
            imageUrl: true,
            dailyRate: true,
            depositAmount: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            emergencyContactName: true,
            emergencyContactPhone: true,
            kycStatus: true,
            kycIdCardImage: true,
            kycStudentIdImage: true,
            kycRejectReason: true,
            kycVerifiedAt: true,
          },
        },
        assignedAsset: {
          select: {
            id: true,
            serialNumber: true,
            status: true,
          },
        },
        inspection: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
