import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getAvailableAssetsForOrder } from "@/lib/overlap-engine";
import { logAuditAction } from "@/lib/audit";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const availableAssets = await getAvailableAssetsForOrder(params.id);

    return NextResponse.json({ assets: availableAssets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { assetId } = await req.json();

    const order = await prisma.rentalOrder.findUnique({
      where: { id: params.id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const asset = await prisma.assetItem.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Release previously assigned asset if different
    if (order.assignedAssetId && order.assignedAssetId !== assetId) {
      await prisma.assetItem.update({
        where: { id: order.assignedAssetId },
        data: { status: "AVAILABLE" },
      });
    }

    // Assign new asset
    const updatedOrder = await prisma.rentalOrder.update({
      where: { id: params.id },
      data: {
        assignedAssetId: asset.id,
      },
    });

    // Mark asset as rented
    await prisma.assetItem.update({
      where: { id: asset.id },
      data: { status: "RENTED" },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "ASSIGN_SERIAL_NUMBER",
      entityType: "ORDER",
      entityId: order.id,
      details: `ระบุเครื่อง/Serial Number: ${asset.serialNumber} ให้กับคำสั่งเช่า ${order.orderNumber}`,
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
