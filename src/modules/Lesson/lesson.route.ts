import express from "express";

import { USER_ROLE } from "../../constants/user";
import { LessonController } from "./lesson.controller";
import { LessonValidation } from "./lesson.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";

const lessonRouter = express.Router();

lessonRouter.post(
  "/create-lesson",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  validateRequest(
    LessonValidation.createLessonValidationSchema
  ),
  LessonController.createLesson
);

lessonRouter.get(
  "/course/:courseId",
  LessonController.getCourseLessons
);


lessonRouter.get(
  "/:id",
  LessonController.getSingleLesson
);

lessonRouter.patch(
  "/:id",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  LessonController.updateLesson
);

lessonRouter.delete(
  "/:id",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  LessonController.deleteLesson
);

export const LessonRoutes = lessonRouter;