import express from "express";

import { USER_ROLE } from "../../constants/user";
import { StudyPlanController } from "./studyPlan.controller";
import { StudyPlanValidation } from "./studyPlan.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";

const planRouter = express.Router();

planRouter.post(
  "/create",
  auth(USER_ROLE.STUDENT),
  validateRequest(
    StudyPlanValidation.createStudyPlanValidationSchema
  ),
  StudyPlanController.createStudyPlan
);

planRouter.get(
  "/my-plans",
  auth(USER_ROLE.STUDENT),
  StudyPlanController.getMyStudyPlans
);

planRouter.get(
  "/:id",
  auth(USER_ROLE.STUDENT),
  StudyPlanController.getSingleStudyPlan
);

planRouter.patch(
  "/:id",
  auth(USER_ROLE.STUDENT),
  validateRequest(
    StudyPlanValidation.updateStudyPlanValidationSchema
  ),
  StudyPlanController.updateStudyPlan
);

planRouter.delete(
  "/:id",
  auth(USER_ROLE.STUDENT),
  StudyPlanController.deleteStudyPlan
);

export const StudyPlanRoutes = planRouter;

    
