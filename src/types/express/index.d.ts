import { JwtPayload } from "jsonwebtoken";
import { TAuthUser } from "../../interface/common";

declare global {
  namespace Express {
    interface Request {
      user?: TAuthUser ;
    }
  }
}

export {};