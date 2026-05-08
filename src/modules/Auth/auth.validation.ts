import { z } from "zod";

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema
};