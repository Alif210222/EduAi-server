import { Request, Response } from "express";
import { ScheduleService } from "./schedule.service";

const createSchedule = async (
  req: Request,
  res: Response
) => {
  const result =
    await ScheduleService.createSchedule(
      req.body,
      (req.user! as any).id
    );

  res.status(201).json({
    success: true,
    data: result
  });
};

const getMySchedules = async (
  req: Request,
  res: Response
) => {
  const result =
    await ScheduleService.getMySchedules(
      (req.user! as any).id,
      req.query.date as string
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getSingleSchedule = async (
  req: Request,
  res: Response
) => {
  const result =
    await ScheduleService.getSingleSchedule(
      req.params.id as any,
      (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const updateSchedule = async (
  req: Request,
  res: Response
) => {
  const result =
    await ScheduleService.updateSchedule(
      req.params.id as any,
      req.body,
      (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const deleteSchedule = async (
  req: Request,
  res: Response
) => {
  const result =
    await ScheduleService.deleteSchedule(
      req.params.id as any,
      (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    message:
      "Schedule deleted successfully",
    data: result
  });
};

export const ScheduleController = {
  createSchedule,
  getMySchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule
};