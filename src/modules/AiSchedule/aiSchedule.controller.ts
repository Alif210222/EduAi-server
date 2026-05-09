import { Request, Response } from "express";
import { AiScheduleService } from "./aiSchedule.service";

const generateSchedule = async (
  req: Request,
  res: Response
) => {
  const result =
    await AiScheduleService.generateSchedule(
      req.body,
      (req.user! as any).id
    );

  res.json({
    success: true,
    data: result
  });
};

export const AiScheduleController = {
  generateSchedule
};