import prisma from "./prisma";

export interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: "INFO" | "SUCCESS" | "WARNING" | "DANGER";
  link?: string;
  channel?: "IN_APP" | "EMAIL_SIMULATED" | "LINE_SIMULATED";
}

/**
 * Creates in-app notification and simulates external dispatch (LINE / Email)
 */
export async function sendNotification(params: CreateNotificationParams) {
  try {
    const notif = await prisma.notification.create({
      data: {
        userId: params.userId,
        title: params.title,
        message: params.message,
        type: params.type || "INFO",
        link: params.link,
        channel: params.channel || "IN_APP",
      },
    });

    // Also record simulation in console for external channels
    if (params.channel === "LINE_SIMULATED") {
      console.log(`[LINE OA NOTIFY] To User ${params.userId}: ${params.title} - ${params.message}`);
    } else if (params.channel === "EMAIL_SIMULATED") {
      console.log(`[EMAIL DISPATCH] To User ${params.userId}: Subject: ${params.title}`);
    }

    return notif;
  } catch (err) {
    console.error("Failed to dispatch notification:", err);
    return null;
  }
}
