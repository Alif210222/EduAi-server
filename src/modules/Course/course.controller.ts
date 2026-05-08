import { Request, Response } from "express";
import { CourseService } from "./course.service";

const createCourse = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.createCourse(
      req.body,
      (req.user as any)?.id 
    );

  res.status(201).json({
    success: true,
    data: result
  });
};

const getAllCourses = async (
  req: Request,
  res: Response
) => {
  const { search, page, limit } = req.query;

  const result =
    await CourseService.getAllCourses(
      search as string,
      Number(page),
      Number(limit)
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getSingleCourse = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.getSingleCourse(
      req.params.id as any
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const updateCourse = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.updateCourse(
      req.params.id as any,
      req.body,
      req.user
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const deleteCourse = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.deleteCourse(
      req.params.id as any,
      req.user
    );

  res.status(200).json({
    success: true,
    data: result
  });
};



const enrollCourse = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.enrollCourse(
      req.params.courseId as any,
       (req.user as any)?.id 
    );

  res.status(201).json({
    success: true,
    data: result
  });
};

const getMyEnrolledCourses = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.getMyEnrolledCourses(
       (req.user as any)?.id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const publishCourse = async (
  req: Request,
  res: Response
) => {
  const result =
    await CourseService.publishCourse(
      req.params.id as any,
      req.user
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyEnrolledCourses,
  publishCourse
};