import { Request, Response } from "express";
import { ChatbotService } from "./chatbot.service";

const sendMessage = async (
  req: Request,
  res: Response
) => {
  const userId = (req.user as any)?.id;

  const result =
    await ChatbotService.sendMessage(
      req.body.message,
      userId
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getChatHistory = async (
  req: Request,
  res: Response
) => {
  const result =
    await ChatbotService.getChatHistory(
      (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

export const ChatbotController = {
  sendMessage,
  getChatHistory
};