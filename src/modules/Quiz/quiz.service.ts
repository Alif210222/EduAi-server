import { prisma } from "../../lib/prisma";

const createQuiz = async (payload: any, user: any) => {
  const course = await prisma.course.findUnique({
    where: { id: payload.courseId }
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

  const result = await prisma.quiz.create({
    data: {
      title: payload.title,
      courseId: payload.courseId,
      questions: {
        create: payload.questions
      }
    },
    include: {
      questions: true
    }
  });

  return result;
};

const getAllQuizzes = async (courseId: string) => {
  return await prisma.quiz.findMany({
    where: { courseId },
    include: {
      questions: true
    }
  });
};

const getSingleQuiz = async (id: string) => {
  return await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: true
    }
  });
};

const deleteQuiz = async (id: string, user: any) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { course: true }
  });

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  if (
    quiz.course.instructorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }

  return await prisma.quiz.delete({
    where: { id }
  });
};

export const QuizService = {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  deleteQuiz
};