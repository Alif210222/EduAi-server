import { z } from "zod";

const createStudyPlanValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    goal: z.string(),
    startDate: z.string(),
    endDate: z.string()
  })
});

const updateStudyPlanValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    goal: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum([
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
      ])
      .optional()
  })
});

export const StudyPlanValidation = {
  createStudyPlanValidationSchema,
  updateStudyPlanValidationSchema
};