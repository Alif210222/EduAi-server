import { z } from "zod";

const searchWordValidationSchema = z.object({
  body: z.object({
    word: z.string()
  })
});

export const DictionaryValidation = {
  searchWordValidationSchema
};