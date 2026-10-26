import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        assets: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let specsObj = {};
    try {
      specsObj = JSON.parse(product.specs);
    } catch {
      specsObj = {};
    }

    let accessoriesArr: string[] = [];
    try {
      accessoriesArr = JSON.parse(product.accessoriesIncluded);
    } catch {
      accessoriesArr = [];
    }

    const availableAssets = product.assets.filter((a) => a.status === "AVAILABLE");

    return NextResponse.json({
      product: {
        ...product,
        specsObj,
        accessoriesArr,
        totalAssetsCount: product.assets.length,
        availableAssetsCount: availableAssets.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        brand: body.brand,
        categoryId: body.categoryId,
        model: body.model,
        description: body.description,
        specs: typeof body.specs === "string" ? body.specs : JSON.stringify(body.specs),
        accessoriesIncluded:
          typeof body.accessoriesIncluded === "string"
            ? body.accessoriesIncluded
            : JSON.stringify(body.accessoriesIncluded),
        dailyRate: parseFloat(body.dailyRate),
        weeklyRate: parseFloat(body.weeklyRate),
        depositAmount: parseFloat(body.depositAmount),
        imageUrl: body.imageUrl,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "UPDATE_PRODUCT",
      entityType: "PRODUCT",
      entityId: params.id,
      details: `แก้ไขข้อมูลสินค้า: ${updated.name}`,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if product has active rental orders
    const activeOrders = await prisma.rentalOrder.count({
      where: {
        productId: params.id,
        status: { in: ["PENDING_PAYMENT", "PAID", "APPROVED", "DELIVERED", "ACTIVE"] },
      },
    });

    if (activeOrders > 0) {
      return NextResponse.json(
        { error: "ไม่สามารถลบสินค้านี้ได้ เนื่องจากมีคำสั่งเช่าที่กำลังดำเนินการอยู่" },
        { status: 400 }
      );
    }

    // Check if there are any historical orders
    const totalOrders = await prisma.rentalOrder.count({
      where: { productId: params.id },
    });

    if (totalOrders > 0) {
      // If there are historical orders, soft delete to preserve order history
      await prisma.product.update({
        where: { id: params.id },
        data: { isActive: false },
      });
    } else {
      // If no orders, delete physical assets and then product
      await prisma.assetItem.deleteMany({
        where: { productId: params.id },
      });
      await prisma.product.delete({
        where: { id: params.id },
      });
    }

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "DELETE_PRODUCT",
      entityType: "PRODUCT",
      entityId: params.id,
      details: `ลบ/ปิดการใช้งานสินค้า ID: ${params.id}`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
