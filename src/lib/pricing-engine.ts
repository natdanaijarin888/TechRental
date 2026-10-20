import { differenceInCalendarDays } from "date-fns";

export interface PricingCalculation {
  totalDays: number;
  dailyRate: number;
  baseRent: number;
  discountAmount: number;
  rentTotal: number;
  depositAmount: number;
  grandTotal: number;
}

export interface FineAndRefundCalculation {
  overdueDays: number;
  lateFeePerDay: number;
  totalLateFee: number;
  damageFee: number;
  originalDeposit: number;
  totalDeductions: number;
  finalRefundAmount: number;
  isCustomerOwing: boolean; // if fines exceed deposit
  balanceOwedByCustomer: number;
}

/**
 * Calculates rental pricing based on dates and product rates
 */
export function calculateRentalPricing(
  startDate: Date | string,
  endDate: Date | string,
  dailyRate: number,
  depositAmount: number,
  weeklyRate?: number
): PricingCalculation {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Inclusive days: start day to end day (min 1 day)
  const diffDays = differenceInCalendarDays(end, start) + 1;
  const totalDays = Math.max(1, diffDays);

  let baseRent = totalDays * dailyRate;
  let discountAmount = 0;

  // If weekly rate is available and rental is >= 7 days, offer weekly discount
  if (weeklyRate && totalDays >= 7) {
    const weeks = Math.floor(totalDays / 7);
    const extraDays = totalDays % 7;
    const weeklyPrice = weeks * weeklyRate + extraDays * dailyRate;
    if (weeklyPrice < baseRent) {
      discountAmount = Math.round((baseRent - weeklyPrice) * 100) / 100;
    }
  }

  const rentTotal = Math.max(0, baseRent - discountAmount);
  const grandTotal = rentTotal + depositAmount;

  return {
    totalDays,
    dailyRate,
    baseRent,
    discountAmount,
    rentTotal,
    depositAmount,
    grandTotal,
  };
}

/**
 * Calculates late fee, damage deductions, and net refundable deposit
 */
export function calculateInspectionRefund(
  expectedReturnDate: Date | string,
  actualReturnDate: Date | string,
  dailyRate: number,
  depositAmount: number,
  damageFee: number = 0,
  lateFeeMultiplier: number = 1.5
): FineAndRefundCalculation {
  const expected = new Date(expectedReturnDate);
  const actual = new Date(actualReturnDate);

  expected.setHours(0, 0, 0, 0);
  actual.setHours(0, 0, 0, 0);

  const daysLate = Math.max(0, differenceInCalendarDays(actual, expected));
  const lateFeePerDay = Math.round(dailyRate * lateFeeMultiplier);
  const totalLateFee = daysLate * lateFeePerDay;

  const totalDeductions = totalLateFee + damageFee;
  const netRefund = depositAmount - totalDeductions;

  const finalRefundAmount = Math.max(0, netRefund);
  const isCustomerOwing = netRefund < 0;
  const balanceOwedByCustomer = isCustomerOwing ? Math.abs(netRefund) : 0;

  return {
    overdueDays: daysLate,
    lateFeePerDay,
    totalLateFee,
    damageFee,
    originalDeposit: depositAmount,
    totalDeductions,
    finalRefundAmount,
    isCustomerOwing,
    balanceOwedByCustomer,
  };
}
