import { prisma } from "../../lib/prisma";


const createLesson = async (
  payload: any,
  user: any
) => {
  const course = await prisma.course.findUnique({
    where: {
      id: payload.courseId
    }
  });

  if (!course) {
    throw new Error("Course not found");
  }

  if (
    course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error(
      "You are not authorized"
    );
  }

  const result = await prisma.lesson.create({
    data: payload
  });

  return result;
};

const getCourseLessons = async (
  courseId: string
) => {
  return await prisma.lesson.findMany({
    where: {
      courseId
    }
  });
};

const getSingleLesson = async (
  lessonId: string
) => {
  return await prisma.lesson.findUnique({
    where: {
      id: lessonId
    }
  });
};

const updateLesson = async (
  lessonId: string,
  payload: any,
  user: any
) => {
  const lesson =
    await prisma.lesson.findUnique({
      where: {
        id: lessonId
      },
      include: {
        course: true
      }
    });

  if (!lesson) {
    throw new Error(
      "Lesson not found"
    );
  }

  if (
    lesson.course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  return await prisma.lesson.update({
    where: {
      id: lessonId
    },
    data: payload
  });
};

const deleteLesson = async (
  lessonId: string,
  user: any
) => {
  const lesson =
    await prisma.lesson.findUnique({
      where: {
        id: lessonId
      },
      include: {
        course: true
      }
    });

  if (!lesson) {
    throw new Error(
      "Lesson not found"
    );
  }

  if (
    lesson.course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  return await prisma.lesson.delete({
    where: {
      id: lessonId
    }
  });
};

export const LessonService = {
  createLesson,
  getCourseLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson
};