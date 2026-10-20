import prisma from "./prisma";

export interface DateRangeCheckResult {
  isAvailable: boolean;
  totalUnits: number;
  maxBookedUnitsInRange: number;
  availableUnits: number;
  availableAssetIds: string[];
  conflictReason?: string;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  totalUnits: number;
  bookedUnits: number;
  availableUnits: number;
  status: "AVAILABLE" | "LIMITED" | "OUT_OF_STOCK";
}

/**
 * Checks if a requested date range has available units for a product
 */
export async function checkProductDateRangeAvailability(
  productId: string,
  startDate: Date,
  endDate: Date,
  excludeOrderId?: string
): Promise<DateRangeCheckResult> {
  // 1. Get all usable assets for this product (available or currently rented, but not broken/retired)
  const functionalAssets = await prisma.assetItem.findMany({
    where: {
      productId,
      status: {
        notIn: ["DAMAGED", "RETIRED"],
      },
    },
    select: {
      id: true,
      serialNumber: true,
      status: true,
    },
  });

  const totalUnits = functionalAssets.length;
  if (totalUnits === 0) {
    return {
      isAvailable: false,
      totalUnits: 0,
      maxBookedUnitsInRange: 0,
      availableUnits: 0,
      availableAssetIds: [],
      conflictReason: "ไม่มีอุปกรณ์ที่พร้อมใช้งานในคลังสินค้ารุ่นนี้",
    };
  }

  // 2. Query all active orders for this product that overlap with [startDate, endDate]
  // Overlap condition: existing.startDate <= request.endDate AND existing.endDate >= request.startDate
  const overlappingOrders = await prisma.rentalOrder.findMany({
    where: {
      productId,
      id: excludeOrderId ? { not: excludeOrderId } : undefined,
      status: {
        in: ["PENDING", "APPROVED", "ACTIVE"],
      },
      startDate: {
        lte: endDate,
      },
      endDate: {
        gte: startDate,
      },
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      assignedAssetId: true,
    },
  });

  // 3. Find day-by-day maximum concurrent bookings
  const current = new Date(startDate);
  const end = new Date(endDate);
  current.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  let maxBooked = 0;
  const temp = new Date(current);
  while (temp <= end) {
    const dayStart = new Date(temp);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(temp);
    dayEnd.setHours(23, 59, 59, 999);

    // Count orders active on this day
    const bookedOnDay = overlappingOrders.filter(
      (order) => order.startDate <= dayEnd && order.endDate >= dayStart
    ).length;

    if (bookedOnDay > maxBooked) {
      maxBooked = bookedOnDay;
    }

    temp.setDate(temp.getDate() + 1);
  }

  const availableUnits = Math.max(0, totalUnits - maxBooked);
  const isAvailable = availableUnits > 0;

  // 4. Find which specific assets are free across the whole requested range
  const busyAssetIds = new Set<string>();
  overlappingOrders.forEach((o) => {
    if (o.assignedAssetId) {
      busyAssetIds.add(o.assignedAssetId);
    }
  });

  const availableAssetIds = functionalAssets
    .filter((a) => !busyAssetIds.has(a.id))
    .map((a) => a.id);

  return {
    isAvailable,
    totalUnits,
    maxBookedUnitsInRange: maxBooked,
    availableUnits,
    availableAssetIds,
    conflictReason: isAvailable
      ? undefined
      : `อุปกรณ์สินค้ารุ่นนี้ถูกจองเต็มแล้วในช่วงวันที่เลือก (${maxBooked}/${totalUnits} เครื่อง)`,
  };
}

/**
 * Returns month availability data for rendering the calendar in Product Detail
 */
export async function getProductMonthlyAvailability(
  productId: string,
  year: number,
  month: number // 1-12
): Promise<DayAvailability[]> {
  const functionalAssets = await prisma.assetItem.findMany({
    where: {
      productId,
      status: {
        notIn: ["DAMAGED", "RETIRED"],
      },
    },
    select: { id: true },
  });

  const totalUnits = functionalAssets.length;

  const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  const orders = await prisma.rentalOrder.findMany({
    where: {
      productId,
      status: {
        in: ["PENDING", "APPROVED", "ACTIVE"],
      },
      startDate: { lte: endOfMonth },
      endDate: { gte: startOfMonth },
    },
    select: {
      startDate: true,
      endDate: true,
    },
  });

  const days: DayAvailability[] = [];
  const daysInMonth = endOfMonth.getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const currentDay = new Date(year, month - 1, d);
    const dayStart = new Date(year, month - 1, d, 0, 0, 0, 0);
    const dayEnd = new Date(year, month - 1, d, 23, 59, 59, 999);

    const bookedUnits = orders.filter(
      (o) => o.startDate <= dayEnd && o.endDate >= dayStart
    ).length;

    const availableUnits = Math.max(0, totalUnits - bookedUnits);

    let status: "AVAILABLE" | "LIMITED" | "OUT_OF_STOCK" = "AVAILABLE";
    if (availableUnits === 0) {
      status = "OUT_OF_STOCK";
    } else if (availableUnits <= Math.ceil(totalUnits * 0.3)) {
      status = "LIMITED";
    }

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dateStr = `${year}-${pad(month)}-${pad(d)}`;

    days.push({
      date: dateStr,
      totalUnits,
      bookedUnits,
      availableUnits,
      status,
    });
  }

  return days;
}

/**
 * Returns available asset items (with Serial Number) that can be assigned to a specific order
 */
export async function getAvailableAssetsForOrder(orderId: string) {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: orderId },
  });
  if (!order) return [];

  // All physical assets for this product (excluding completely retired ones)
  const assets = await prisma.assetItem.findMany({
    where: {
      productId: order.productId,
      status: {
        notIn: ["RETIRED"],
      },
    },
    orderBy: { serialNumber: "asc" },
  });

  // Find orders overlapping this order that have an assigned asset
  const conflictingOrders = await prisma.rentalOrder.findMany({
    where: {
      id: { not: order.id },
      productId: order.productId,
      status: { in: ["APPROVED", "ACTIVE"] },
      assignedAssetId: { not: null },
      startDate: { lte: order.endDate },
      endDate: { gte: order.startDate },
    },
    select: { assignedAssetId: true },
  });

  const occupiedAssetIds = new Set(conflictingOrders.map((o) => o.assignedAssetId));

  return assets.map((asset) => {
    const isCurrent = asset.id === order.assignedAssetId;
    let isAvailable = true;
    let reason = "พร้อมใช้งาน";

    if (isCurrent) {
      isAvailable = true;
      reason = "เครื่องที่ผูกกับออร์เดอร์นี้";
    } else if (occupiedAssetIds.has(asset.id)) {
      isAvailable = false;
      reason = "ชนคิวคำสั่งเช่าอื่น";
    } else if (asset.status === "DAMAGED") {
      isAvailable = false;
      reason = "เครื่องชำรุด";
    } else if (asset.status === "MAINTENANCE") {
      isAvailable = false;
      reason = "กำลังซ่อมบำรุง";
    }

    return {
      ...asset,
      isCurrentForOrder: isCurrent,
      isAvailableForOrder: isAvailable,
      reason,
    };
  });
}
