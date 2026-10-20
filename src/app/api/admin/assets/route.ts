import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const status = searchParams.get("status");

    const whereClause: any = {};
    if (productId) whereClause.productId = productId;
    if (status && status !== "ALL") whereClause.status = status;

    const assets = await prisma.assetItem.findMany({
      where: whereClause,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            brand: true,
            model: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { serialNumber: "asc" },
    });

    return NextResponse.json({ assets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { productId, serialNumber, status, conditionNotes } = await req.json();

    if (!productId || !serialNumber) {
      return NextResponse.json(
        { error: "กรุณาระบุสินค้าและ Serial Number" },
        { status: 400 }
      );
    }

    const existing = await prisma.assetItem.findUnique({
      where: { serialNumber: serialNumber.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Serial Number "${serialNumber}" นี้มีอยู่ในระบบแล้ว` },
        { status: 400 }
      );
    }

    const asset = await prisma.assetItem.create({
      data: {
        productId,
        serialNumber: serialNumber.trim(),
        status: status || "AVAILABLE",
        conditionNotes: conditionNotes || null,
        purchaseDate: new Date(),
        lastInspectedAt: new Date(),
      },
      include: { product: true },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "CREATE_ASSET_ITEM",
      entityType: "ASSET",
      entityId: asset.id,
      details: `เพิ่มอุปกรณ์ใหม่ในสต็อก S/N: ${asset.serialNumber} (สินค้า: ${asset.product.name})`,
    });

    return NextResponse.json({ success: true, asset });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, status, conditionNotes } = await req.json();

    const asset = await prisma.assetItem.update({
      where: { id },
      data: {
        status: status || undefined,
        conditionNotes: conditionNotes !== undefined ? conditionNotes : undefined,
        lastInspectedAt: new Date(),
      },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "UPDATE_ASSET_STATUS",
      entityType: "ASSET",
      entityId: asset.id,
      details: `เปลี่ยนสถานะอุปกรณ์ S/N: ${asset.serialNumber} เป็น "${asset.status}" (${conditionNotes || ""})`,
    });

    return NextResponse.json({ success: true, asset });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
