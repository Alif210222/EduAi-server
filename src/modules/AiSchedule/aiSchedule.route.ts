import express from "express";

import { USER_ROLE } from "../../constants/user";
import { AiScheduleController } from "./aiSchedule.controller";
import auth from "../../middlewares/auth";

const aiScheduleRouter = express.Router();

aiScheduleRouter.post(
  "/generate",
  auth(USER_ROLE.STUDENT),
  AiScheduleController.generateSchedule
);

export const AiScheduleRoutes = aiScheduleRouter;