import { prisma } from "../../lib/prisma";

const createStudyPlan = async (
  payload: any,
  userId: string
) => {
  const result =
    await prisma.studyPlan.create({
      data: {
        title: payload.title,
        goal: payload.goal,
        startDate: new Date(
          payload.startDate
        ),
        endDate: new Date(
          payload.endDate
        ),
        userId
      }
    });

  return result;
};

const getMyStudyPlans = async (
  userId: string,
  status?: string
) => {
  const whereCondition: any = {
    userId
  };

  if (status) {
    whereCondition.status = status;
  }

  return await prisma.studyPlan.findMany({
    where: whereCondition,
    orderBy: {
      createdAt: "desc"
    }
  });
};

const getSingleStudyPlan = async (
  id: string,
  userId: string
) => {
  const plan =
    await prisma.studyPlan.findFirst({
      where: {
        id,
        userId
      }
    });

  if (!plan) {
    throw new Error(
      "Study plan not found"
    );
  }

  return plan;
};

const updateStudyPlan = async (
  id: string,
  payload: any,
  userId: string
) => {
  const existingPlan =
    await prisma.studyPlan.findFirst({
      where: {
        id,
        userId
      }
    });

  if (!existingPlan) {
    throw new Error(
      "Study plan not found"
    );
  }

  return await prisma.studyPlan.update({
    where: { id },
    data: {
      ...payload,
      startDate: payload.startDate
        ? new Date(payload.startDate)
        : undefined,
      endDate: payload.endDate
        ? new Date(payload.endDate)
        : undefined
    }
  });
};

const deleteStudyPlan = async (
  id: string,
  userId: string
) => {
  const existingPlan =
    await prisma.studyPlan.findFirst({
      where: {
        id,
        userId
      }
    });

  if (!existingPlan) {
    throw new Error(
      "Study plan not found"
    );
  }

  return await prisma.studyPlan.delete({
    where: { id }
  });
};

export const StudyPlanService = {
  createStudyPlan,
  getMyStudyPlans,
  getSingleStudyPlan,
  updateStudyPlan,
  deleteStudyPlan
};