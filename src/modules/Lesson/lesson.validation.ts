import { z } from "zod";

const createLessonValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    videoUrl: z.string().optional(),
    pdfUrl: z.string().optional(),
    content: z.string().optional(),
    courseId: z.string()
  })
});

export const LessonValidation = {
  createLessonValidationSchema
};