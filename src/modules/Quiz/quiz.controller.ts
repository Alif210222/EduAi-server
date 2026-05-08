import { Request, Response } from "express";
import { QuizService } from "./quiz.service";

const createQuiz = async (req: Request, res: Response) => {
  const result = await QuizService.createQuiz(
    req.body,
    req.user
  );

  res.status(201).json({
    success: true,
    data: result
  });
};

const getAllQuizzes = async (req: Request, res: Response) => {
  const result = await QuizService.getAllQuizzes(
    req.params.courseId as any
  );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getSingleQuiz = async (req: Request, res: Response) => {
  const result = await QuizService.getSingleQuiz(
    req.params.id as any
  );

  res.status(200).json({
    success: true,
    data: result
  });
};

const deleteQuiz = async (req: Request, res: Response) => {
  const result = await QuizService.deleteQuiz(
    req.params.id as any,
    req.user
  );

  res.status(200).json({
    success: true,
    data: result
  });
};

export const QuizController = {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  deleteQuiz
};