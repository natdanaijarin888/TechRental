import { NextRequest, NextResponse } from "next/server";
import { getProductMonthlyAvailability, checkProductDateRangeAvailability } from "@/lib/overlap-engine";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const today = new Date();
    const year = parseInt(searchParams.get("year") || `${today.getFullYear()}`);
    const month = parseInt(searchParams.get("month") || `${today.getMonth() + 1}`);

    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");

    // If specific date range is requested, also run exact range overlap check
    let rangeCheck = null;
    if (startDateStr && endDateStr) {
      const start = new Date(startDateStr);
      const end = new Date(endDateStr);
      rangeCheck = await checkProductDateRangeAvailability(params.id, start, end);
    }

    const calendarData = await getProductMonthlyAvailability(params.id, year, month);

    return NextResponse.json({
      productId: params.id,
      year,
      month,
      calendarData,
      rangeCheck,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
