import { Request, Response } from "express";
import { StudyPlanService } from "./studyPlan.service";

const createStudyPlan = async (
  req: Request,
  res: Response
) => {
  const result =
    await StudyPlanService.createStudyPlan(
      req.body,
      (req.user! as any).id
    );

  res.status(201).json({
    success: true,
    data: result
  });
};

const getMyStudyPlans = async (
  req: Request,
  res: Response
) => {
  const result =
    await StudyPlanService.getMyStudyPlans(
      (req.user! as any).id,
      req.query.status as string
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getSingleStudyPlan = async (
  req: Request,
  res: Response
) => {
  const result =
    await StudyPlanService.getSingleStudyPlan(
      req.params.id as any,
     (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const updateStudyPlan = async (
  req: Request,
  res: Response
) => {
  const result =
    await StudyPlanService.updateStudyPlan(
      req.params.id as any,
      req.body,
      (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const deleteStudyPlan = async (
  req: Request,
  res: Response
) => {
  const result =
    await StudyPlanService.deleteStudyPlan(
      req.params.id as any,
      (req.user!as any).id
    );

  res.status(200).json({
    success: true,
    message:
      "Study plan deleted successfully",
    data: result
  });
};

export const StudyPlanController = {
  createStudyPlan,
  getMyStudyPlans,
  getSingleStudyPlan,
  updateStudyPlan,
  deleteStudyPlan
};