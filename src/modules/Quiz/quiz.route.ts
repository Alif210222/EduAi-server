import express from "express";
import { USER_ROLE } from "../../constants/user";
import { QuizValidation } from "./quiz.validation";
import { QuizController } from "./quiz.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";


const quizRouter = express.Router();


quizRouter.post(
  "/create-quiz",
  auth(USER_ROLE.INSTRUCTOR, USER_ROLE.ADMIN),
  validateRequest(
    QuizValidation.createQuizValidationSchema
  ),
  QuizController.createQuiz
);

quizRouter.get(
  "/course/:courseId",
  QuizController.getAllQuizzes
);

quizRouter.get(
  "/:id",
  QuizController.getSingleQuiz
);

quizRouter.delete(
  "/:id",
  auth(USER_ROLE.INSTRUCTOR, USER_ROLE.ADMIN),
  QuizController.deleteQuiz
);

export const QuizRoutes = quizRouter;