import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: ZodObject<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.parseAsync({
        body: req.body
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;