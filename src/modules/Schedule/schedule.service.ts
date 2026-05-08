import { prisma } from "../../lib/prisma";

const createSchedule = async (
  payload: any,
  userId: string
) => {
  const result = await prisma.schedule.create({
    data: {
      title: payload.title,
      description: payload.description,
      startTime: new Date(payload.startTime),
      endTime: new Date(payload.endTime),
      userId
    }
  });

  return result;
};

const getMySchedules = async (
  userId: string,
  date?: string
) => {
  const whereCondition: any = {
    userId
  };

  if (date) {
    const selectedDate = new Date(date);

    const nextDate = new Date(date);
    nextDate.setDate(
      nextDate.getDate() + 1
    );

    whereCondition.startTime = {
      gte: selectedDate,
      lt: nextDate
    };
  }

  return await prisma.schedule.findMany({
    where: whereCondition,
    orderBy: {
      startTime: "asc"
    }
  });
};

const getSingleSchedule = async (
  id: string,
  userId: string
) => {
  const schedule =
    await prisma.schedule.findFirst({
      where: {
        id,
        userId
      }
    });

  if (!schedule) {
    throw new Error(
      "Schedule not found"
    );
  }

  return schedule;
};

const updateSchedule = async (
  id: string,
  payload: any,
  userId: string
) => {
  const existingSchedule =
    await prisma.schedule.findFirst({
      where: {
        id,
        userId
      }
    });

  if (!existingSchedule) {
    throw new Error(
      "Schedule not found"
    );
  }

  return await prisma.schedule.update({
    where: { id },
    data: {
      ...payload,
      startTime: payload.startTime
        ? new Date(payload.startTime)
        : undefined,
      endTime: payload.endTime
        ? new Date(payload.endTime)
        : undefined
    }
  });
};

const deleteSchedule = async (
  id: string,
  userId: string
) => {
  const existingSchedule =
    await prisma.schedule.findFirst({
      where: {
        id,
        userId
      }
    });

  if (!existingSchedule) {
    throw new Error(
      "Schedule not found"
    );
  }

  return await prisma.schedule.delete({
    where: { id }
  });
};

export const ScheduleService = {
  createSchedule,
  getMySchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule
};