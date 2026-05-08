import { z } from "zod";

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    price: z.number(),
    isPremium: z.boolean().optional()
  })
});

export const CourseValidation = {
  createCourseValidationSchema
};