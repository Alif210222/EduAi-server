import express from "express";

import { USER_ROLE } from "../../constants/user";
import { CourseController } from "./course.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  CourseController.createCourse
);

router.get(
  "/my-courses",
  auth(USER_ROLE.STUDENT),
  CourseController.getMyCourses
);

router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  CourseController.deleteCourse
);

export const CourseRoutes = router;