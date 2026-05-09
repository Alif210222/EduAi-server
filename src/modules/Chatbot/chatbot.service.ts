import { websiteContext } from "../../config/websiteContext";
import { prisma } from "../../lib/prisma";
import genAI from "../../utils/gemini";


const sendMessage = async (
  message: string,
  userId?: string
) => {
  const courses = await prisma.course.findMany({
    select: {
      title: true,
      description: true
    }
  });

  const courseContext = courses
    .map(
      (course) =>
        `${course.title}: ${course.description}`
    )
    .join("\n");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are EduAI assistant.

Website Context:
${websiteContext}

Website courses:
${courseContext}

User Question:
${message}

Answer politely and briefly.
`;

  const result =
    await model.generateContent(prompt);

  const aiResponse =
    result.response.text();

  if (userId) {
    await prisma.chatbotHistory.create({
      data: {
        userId,
        prompt: message,
        response: aiResponse
      }
    });
  }

  return {
    message: aiResponse
  };
};

const getChatHistory = async (
  userId: string
) => {
  return await prisma.chatbotHistory.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const ChatbotService = {
  sendMessage,
  getChatHistory
};