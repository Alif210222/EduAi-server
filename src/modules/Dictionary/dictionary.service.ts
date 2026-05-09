import genAI from "../../utils/gemini";
import { prisma } from "../../lib/prisma";

const searchWord = async (
  word: string,
  userId?: string
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
User entered this word: "${word}"

Detect whether it is Bangla or English.

If English:
- Translate to Bangla

If Bangla:
- Translate to English

Return strictly JSON format:

{
  "word":"",
  "language":"",
  "translation":"",
  "meaning":"",
  "synonyms":[],
  "antonyms":[],
  "example":"",
  "pronunciation":""
}
`;

  const result =
    await model.generateContent(prompt);

  const responseText =
    result.response.text();

  const cleanResponse = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsedData =
    JSON.parse(cleanResponse);

  if (userId) {
    await prisma.dictionaryWord.create({
      data: {
        userId,
        word: parsedData.word,
        language: parsedData.language,
        translation:
          parsedData.translation,
        meaning: parsedData.meaning,
        example: parsedData.example,
        pronunciation:
          parsedData.pronunciation,
        synonyms:
          parsedData.synonyms,
        antonyms:
          parsedData.antonyms
      }
    });
  }

  return parsedData;
};

const getSearchHistory = async (
  userId: string
) => {
  return await prisma.dictionaryWord.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const DictionaryService = {
  searchWord,
  getSearchHistory
};