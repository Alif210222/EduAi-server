import express from "express";
import { USER_ROLE } from "../../constants/user";
import { CourseController } from "./course.controller";
import { CourseValidation } from "./course.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  validateRequest(
    CourseValidation.createCourseValidationSchema
  ),
  CourseController.createCourse
);

courseRouter.get(
  "/",
  CourseController.getAllCourses
);

courseRouter.get(
  "/my-enrolled-courses",
  auth(USER_ROLE.STUDENT),
  CourseController.getMyEnrolledCourses
);

courseRouter.get(
  "/:id",
  CourseController.getSingleCourse
);

courseRouter.patch(
  "/:id",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  CourseController.updateCourse
);

courseRouter.delete(
  "/:id",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  CourseController.deleteCourse
);

courseRouter.post(
  "/enroll/:courseId",
  auth(USER_ROLE.STUDENT),
  CourseController.enrollCourse
);

courseRouter.patch(
  "/publish/:id",
  auth(
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.ADMIN
  ),
  CourseController.publishCourse
);

export const CourseRoutes = courseRouter;