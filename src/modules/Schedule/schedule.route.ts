import express from "express";

import { USER_ROLE } from "../../constants/user";
import { ScheduleController } from "./schedule.controller";
import { ScheduleValidation } from "./schedule.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";

const scheduleRouter = express.Router();

scheduleRouter.post(
  "/create",
  auth(USER_ROLE.STUDENT),
  validateRequest(
    ScheduleValidation.createScheduleValidationSchema
  ),
  ScheduleController.createSchedule
);

scheduleRouter.get(
  "/my-schedules",
  auth(USER_ROLE.STUDENT),
  ScheduleController.getMySchedules
);

scheduleRouter.get(
  "/:id",
  auth(USER_ROLE.STUDENT),
  ScheduleController.getSingleSchedule
);

scheduleRouter.patch(
  "/:id",
  auth(USER_ROLE.STUDENT),
  validateRequest(
    ScheduleValidation.updateScheduleValidationSchema
  ),
  ScheduleController.updateSchedule
);

scheduleRouter.delete(
  "/:id",
  auth(USER_ROLE.STUDENT),
  ScheduleController.deleteSchedule
);

export const ScheduleRoutes = scheduleRouter;