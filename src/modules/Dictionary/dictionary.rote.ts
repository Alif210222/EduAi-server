import express from "express";

import { DictionaryValidation } from "./dictionary.validation";
import { USER_ROLE } from "../../constants/user";
import auth from "../../middlewares/auth";
import { DictionaryController } from "./dictonary.controller";
import validateRequest from "../../middlewares/validationRequest";

const dictionaryRouter = express.Router();

dictionaryRouter.post(
  "/search",
  validateRequest(
    DictionaryValidation.searchWordValidationSchema
  ),
  DictionaryController.searchWord
);

dictionaryRouter.get(
  "/history",
  auth(USER_ROLE.STUDENT),
  DictionaryController.getHistory
);

export const DictionaryRoutes = dictionaryRouter;