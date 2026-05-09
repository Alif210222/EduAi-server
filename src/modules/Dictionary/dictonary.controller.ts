import { Request, Response } from "express";
import { DictionaryService } from "./dictionary.service";

const searchWord = async (
  req: Request,
  res: Response
) => {
  const userId = (req.user as any)?.id;

  const result =
    await DictionaryService.searchWord(
      req.body.word,
      userId
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

const getHistory = async (
  req: Request,
  res: Response
) => {
  const result =
    await DictionaryService.getSearchHistory(
      (req.user! as any).id
    );

  res.status(200).json({
    success: true,
    data: result
  });
};

export const DictionaryController = {
  searchWord,
  getHistory
};