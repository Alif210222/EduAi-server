import { prisma } from "../../lib/prisma";

const createNotification = async (
  userId: string,
  message: string
) => {
  return await prisma.notification.create({
    data: {
      userId,
      message
    }
  });
};

const getMyNotifications = async (
  userId: string
) => {
  return await prisma.notification.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

const markAsRead = async (
  id: string,
  userId: string
) => {
  return await prisma.notification.update({
    where: { id },
    data: {
      isRead: true
    }
  });
};

export const NotificationService = {
  createNotification,
  getMyNotifications,
  markAsRead
};