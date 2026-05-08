import { prisma } from "../../lib/prisma";



// Create course 
const createCourse = async (
  payload: any,
  instructorId: string
) => {
  const result = await prisma.course.create({
    data: {
      ...payload,
      instructorId
    }
  });

  return result;
};


const getAllCourses = async (
  searchTerm?: string,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const whereCondition = searchTerm
    ? {
        title: {
          contains: searchTerm,
          mode: "insensitive"
        }
      }
    : {};

  const courses = await prisma.course.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      instructor: true
    }
  });

  const total = await prisma.course.count({
    where: whereCondition
  });

  return {
    meta: {
      page,
      limit,
      total
    },
    data: courses
  };
};

const getSingleCourse = async (id: string) => {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: true,
      quizzes: true,
      instructor: true
    }
  });
};

const updateCourse = async (
  id: string,
  payload: any,
  user: any
) => {
  const course = await prisma.course.findUnique({
    where: { id }
  });

  if (!course) {
    throw new Error("Course not found");
  }

  if (
    course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }

  return await prisma.course.update({
    where: { id },
    data: payload
  });
};

const deleteCourse = async (
  id: string,
  user: any
) => {
  const course = await prisma.course.findUnique({
    where: { id }
  });

  if (!course) {
    throw new Error("Course not found");
  }

  if (
    course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }

  return await prisma.course.delete({
    where: { id }
  });
};

const enrollCourse = async (
  courseId: string,
  userId: string
) => {
  const existingEnrollment =
    await prisma.enrollment.findFirst({
      where: {
        userId,
        courseId
      }
    });

  if (existingEnrollment) {
    throw new Error(
      "Already enrolled in this course"
    );
  }

  return await prisma.enrollment.create({
    data: {
      userId,
      courseId
    }
  });
};

const getMyEnrolledCourses = async (
  userId: string
) => {
  return await prisma.enrollment.findMany({
    where: {
      userId
    },
    include: {
      course: true
    }
  });
};

const publishCourse = async (
  courseId: string,
  user: any
) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId }
  });

  if (!course) {
    throw new Error("Course not found");
  }

  if (
    course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }

  return await prisma.course.update({
    where: { id: courseId },
    data: {
      isPublished: true
    }
  });
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyEnrolledCourses,
  publishCourse
};