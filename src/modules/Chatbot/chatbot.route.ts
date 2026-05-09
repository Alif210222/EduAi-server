import express from "express";

import { ChatbotController } from "./chatbot.controller";
import { ChatbotValidation } from "./chatbot.validation";
import { USER_ROLE } from "../../constants/user";
import validateRequest from "../../middlewares/validationRequest";
import auth from "../../middlewares/auth";

const aiChatRouter = express.Router();

aiChatRouter.post(
  "/send-message",
  validateRequest(
    ChatbotValidation.sendMessageValidationSchema
  ),
  ChatbotController.sendMessage
);

aiChatRouter.get(
  "/history",
  auth(USER_ROLE.STUDENT),
  ChatbotController.getChatHistory
);

export const ChatbotRoutes = aiChatRouter;