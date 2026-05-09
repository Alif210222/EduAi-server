import genAI from "../../utils/gemini";
import { prisma } from "../../lib/prisma";

const generateSchedule = async (
  payload: any,
  userId: string
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
Create a weekly study schedule.

Goal: ${payload.goal}
Available Hours: ${payload.availableHours}
Subjects: ${payload.subjects.join(",")}
Sleep Hours: ${payload.sleepHours}

Return JSON format.
`;

  const result =
    await model.generateContent(prompt);

  const response =
    result.response.text();

  return {
    aiResponse: response
  };
};

export const AiScheduleService = {
  generateSchedule
};