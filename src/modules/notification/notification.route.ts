import express from "express";
import { NotificationController } from "./notification.controller";
import { USER_ROLE } from "../../constants/user";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/my-notifications",
  auth(USER_ROLE.STUDENT),
  NotificationController.getMyNotifications
);

router.patch(
  "/:id/read",
  auth(USER_ROLE.STUDENT),
  NotificationController.markAsRead
);

export const NotificationRoutes = router;