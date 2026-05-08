import express from "express";
import { AuthController } from "./auth.controller";

import { AuthValidation } from "./auth.validation";

import { createToken } from "../../utils/jwt";
import validateRequest from "../../middlewares/validationRequest";
import passport from "passport";
import config from "../../config";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateRequest(
    AuthValidation.registerValidationSchema
  ),
  AuthController.registerUser
);

authRouter.post(
  "/login",
  validateRequest(
    AuthValidation.loginValidationSchema
  ),
  AuthController.loginUser
);

authRouter.post(
  "/refresh-token",
  AuthController.refreshToken
);

authRouter.post(
  "/logout",
  AuthController.logoutUser
);



// Google login start
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


// Google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),

  async (req: any, res) => {
    const user = req.user;

    const accessToken = createToken(
      {
        id: user.id,
        role: user.role
      },
     config.jwt_access_secret,
     config.jwt_access_expires
    );

    const refreshToken = createToken(
      {
        id: user.id
      },
      config.jwt_refresh_secret,
      config.jwt_refresh_expires
    );

    res.cookie(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "none"
      }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/social-success?token=${accessToken}`
    );
  }
);

export const AuthRoutes = authRouter;