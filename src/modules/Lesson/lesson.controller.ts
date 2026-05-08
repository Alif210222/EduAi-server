import { Request, Response } from "express";
import { LessonService } from "./lesson.service";

const createLesson = async (
  req: Request,
  res: Response
) => {
  const result =
    await LessonService.createLesson(
      req.body,
      req.user
    );

  res.status(201).json({
    success: true,
    data: result
  });
};

const getCourseLessons = async (
  req: Request,
  res: Response
) => {
  const result =
    await LessonService.getCourseLessons(
      req.params.courseId as any
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getSingleLesson = async (
  req: Request,
  res: Response
) => {
  const result =
    await LessonService.getSingleLesson(
      req.params.id as any
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const updateLesson = async (
  req: Request,
  res: Response
) => {
  const result =
    await LessonService.updateLesson(
      req.params.id as any,
      req.body,
      req.user
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const deleteLesson = async (
  req: Request,
  res: Response
) => {
  const result =
    await LessonService.deleteLesson(
      (req.params as any)?.id,
      req.user
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

export const LessonController = {
  createLesson,
  getCourseLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson
};