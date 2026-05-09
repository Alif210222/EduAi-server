import { z } from "zod";

const sendMessageValidationSchema = z.object({
  body: z.object({
    message: z.string()
  })
});

export const ChatbotValidation = {
  sendMessageValidationSchema
};