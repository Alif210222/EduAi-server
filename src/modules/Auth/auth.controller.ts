import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const registerUser = async (
  req: Request,
  res: Response
) => {
  const result = await AuthService.registerUser(req.body);

  res.status(201).json({
    success: true,
    data: result
  });
};


const loginUser = async (
  req: Request,
  res: Response
) => {
  const result = await AuthService.loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none"
  });

  res.status(200).json({
    success: true,
    accessToken: result.accessToken
  });
};



const refreshToken = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies.refreshToken;

  const accessToken =
    await AuthService.getNewAccessToken(token);

  res.status(200).json({
    success: true,
    accessToken
  });
};

const logoutUser = async (
  req: Request,
  res: Response
) => {
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};

export const AuthController = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser
};