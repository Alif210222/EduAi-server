import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...requiredRoles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_access_secret
      ) as JwtPayload;

      req.user = verifiedUser;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(verifiedUser.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};

export default auth;