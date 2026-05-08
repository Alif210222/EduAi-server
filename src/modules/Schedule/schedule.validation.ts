import { z } from "zod";

const createScheduleValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    startTime: z.string(),
    endTime: z.string()
  })
});

const updateScheduleValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional()
  })
});

export const ScheduleValidation = {
  createScheduleValidationSchema,
  updateScheduleValidationSchema
};