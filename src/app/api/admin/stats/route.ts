import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const today = new Date();
    const twoDaysLater = new Date(today.getTime() + 2 * 24 * 3600 * 1000);

    // 1. Order counts by status
    const [
      totalOrdersCount,
      pendingOrdersCount,
      activeOrdersCount,
      returnedOrdersCount,
      completedOrdersCount,
    ] = await Promise.all([
      prisma.rentalOrder.count(),
      prisma.rentalOrder.count({ where: { status: "PENDING" } }),
      prisma.rentalOrder.count({ where: { status: "ACTIVE" } }),
      prisma.rentalOrder.count({ where: { status: "RETURNED" } }),
      prisma.rentalOrder.count({ where: { status: "COMPLETED" } }),
    ]);

    // 2. Revenue & Deposit metrics
    const ordersWithRevenue = await prisma.rentalOrder.findMany({
      where: {
        paymentStatus: "VERIFIED",
      },
      select: {
        rentTotal: true,
        depositAmount: true,
        status: true,
      },
    });

    const totalRevenue = ordersWithRevenue.reduce((sum, o) => sum + o.rentTotal, 0);
    const activeDepositsHeld = ordersWithRevenue
      .filter((o) => o.status === "ACTIVE" || o.status === "APPROVED")
      .reduce((sum, o) => sum + o.depositAmount, 0);

    // 3. Asset metrics
    const [
      totalAssetsCount,
      availableAssetsCount,
      rentedAssetsCount,
      maintenanceAssetsCount,
      damagedAssetsCount,
    ] = await Promise.all([
      prisma.assetItem.count(),
      prisma.assetItem.count({ where: { status: "AVAILABLE" } }),
      prisma.assetItem.count({ where: { status: "RENTED" } }),
      prisma.assetItem.count({ where: { status: "MAINTENANCE" } }),
      prisma.assetItem.count({ where: { status: "DAMAGED" } }),
    ]);

    // 4. Orders due soon (Active orders with endDate <= 2 days from now)
    const dueSoonOrders = await prisma.rentalOrder.findMany({
      where: {
        status: "ACTIVE",
        endDate: {
          lte: twoDaysLater,
        },
      },
      include: {
        customer: { select: { name: true, phone: true, email: true } },
        product: { select: { name: true, imageUrl: true } },
        assignedAsset: { select: { serialNumber: true } },
      },
      orderBy: { endDate: "asc" },
    });

    // 5. Overdue active orders (endDate < today)
    const overdueOrders = await prisma.rentalOrder.findMany({
      where: {
        status: "ACTIVE",
        endDate: {
          lt: today,
        },
      },
      include: {
        customer: { select: { name: true, phone: true } },
        product: { select: { name: true } },
        assignedAsset: { select: { serialNumber: true } },
      },
    });

    // 6. Most rented products
    const productsWithOrders = await prisma.product.findMany({
      include: {
        _count: {
          select: { orders: true },
        },
        category: true,
      },
      orderBy: {
        orders: { _count: "desc" },
      },
      take: 5,
    });

    return NextResponse.json({
      metrics: {
        totalRevenue,
        activeDepositsHeld,
        totalOrdersCount,
        pendingOrdersCount,
        activeOrdersCount,
        returnedOrdersCount,
        completedOrdersCount,
        totalAssetsCount,
        availableAssetsCount,
        rentedAssetsCount,
        maintenanceAssetsCount,
        damagedAssetsCount,
      },
      dueSoonOrders,
      overdueOrders,
      topProducts: productsWithOrders.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category.name,
        dailyRate: p.dailyRate,
        rentCount: p._count.orders,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
