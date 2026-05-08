import { Request, Response } from "express";

const createCourse = async (
  req: Request,
  res: Response
) => {
  const instructorId = req.user.id ;

  const result = await CourseService.createCourse(
    req.body,
    instructorId
  );

  res.status(200).json({
    success: true,
    data: result,
  });
};