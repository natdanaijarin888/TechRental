import prisma from "./prisma";

export interface LogAuditParams {
  userId?: string;
  userName: string;
  userRole: string;
  action: string;
  entityType: "ORDER" | "USER" | "PRODUCT" | "ASSET" | "INSPECTION" | "SYSTEM";
  entityId: string;
  details: string | Record<string, any>;
  ipAddress?: string;
}

export async function logAuditAction(params: LogAuditParams) {
  try {
    const detailsStr =
      typeof params.details === "string"
        ? params.details
        : JSON.stringify(params.details);

    await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        userName: params.userName,
        userRole: params.userRole,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        details: detailsStr,
        ipAddress: params.ipAddress || "127.0.0.1",
      },
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}
