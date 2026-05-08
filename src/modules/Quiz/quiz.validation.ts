import { z } from "zod";

const createQuizValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    courseId: z.string(),
    questions: z.array(
      z.object({
        questionText: z.string(),
        optionA: z.string(),
        optionB: z.string(),
        optionC: z.string(),
        optionD: z.string(),
        correctAns: z.string()
      })
    )
  })
});

export const QuizValidation = {
  createQuizValidationSchema
};