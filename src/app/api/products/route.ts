import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAuditAction } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const categorySlug = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";

    const whereClause: any = {
      isActive: true,
    };

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (categorySlug && categorySlug !== "all") {
      whereClause.category = {
        slug: categorySlug,
      };
    }

    if (brand && brand !== "all") {
      whereClause.brand = {
        equals: brand,
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        assets: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Add inventory summary counts to each product
    const formatted = products.map((p) => {
      const totalUnits = p.assets.length;
      const availableUnits = p.assets.filter((a) => a.status === "AVAILABLE").length;
      const rentedUnits = p.assets.filter((a) => a.status === "RENTED").length;

      let specsObj = {};
      try {
        specsObj = JSON.parse(p.specs);
      } catch {
        specsObj = {};
      }

      let accessoriesArr: string[] = [];
      try {
        accessoriesArr = JSON.parse(p.accessoriesIncluded);
      } catch {
        accessoriesArr = [];
      }

      return {
        ...p,
        specsObj,
        accessoriesArr,
        totalUnits,
        availableUnits,
        rentedUnits,
      };
    });

    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      products: formatted,
      categories,
    });
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

    const body = await req.json();
    const {
      name,
      brand,
      categoryId,
      model,
      description,
      specs,
      accessoriesIncluded,
      dailyRate,
      weeklyRate,
      depositAmount,
      imageUrl,
      initialSerialNumbers, // string[] of initial assets to create
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        categoryId,
        model,
        description,
        specs: typeof specs === "string" ? specs : JSON.stringify(specs),
        accessoriesIncluded:
          typeof accessoriesIncluded === "string"
            ? accessoriesIncluded
            : JSON.stringify(accessoriesIncluded),
        dailyRate: parseFloat(dailyRate),
        weeklyRate: parseFloat(weeklyRate || dailyRate * 6),
        depositAmount: parseFloat(depositAmount),
        imageUrl:
          imageUrl ||
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      },
    });

    // Create initial assets if provided
    if (Array.isArray(initialSerialNumbers) && initialSerialNumbers.length > 0) {
      for (const sn of initialSerialNumbers) {
        if (sn && sn.trim()) {
          await prisma.assetItem.create({
            data: {
              productId: product.id,
              serialNumber: sn.trim(),
              status: "AVAILABLE",
            },
          });
        }
      }
    }

    await logAuditAction({
      userId: session.id,
      userName: session.name,
      userRole: session.role,
      action: "CREATE_PRODUCT",
      entityType: "PRODUCT",
      entityId: product.id,
      details: `สร้างสินค้าใหม่: ${product.name} (เรต ฿${product.dailyRate}/วัน)`,
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
