import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

const getMyNotifications = async (
  req: Request,
  res: Response
) => {
  const result =
    await NotificationService.getMyNotifications(
      (req.user! as any).id
    );

  res.json({
    success: true,
    data: result
  });
};

const markAsRead = async (
  req: Request,
  res: Response
) => {
  const result =
    await NotificationService.markAsRead(
      req.params.id as any ,
      (req.user! as any).id
    );

  res.json({
    success: true,
    data: result
  });
};

export const NotificationController = {
  getMyNotifications,
  markAsRead
};