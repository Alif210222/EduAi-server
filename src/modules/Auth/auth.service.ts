import config from "../../config";
import { prisma } from "../../lib/prisma"
import { comparePassword, hashPassword } from "../../utils/bcrypt"
import { createToken, verifyToken } from "../../utils/jwt"


//Register user 

const registerUser = async (payload: any) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword
    }
  });

  return user;
};



//Login user 

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });

  if (!user) {
    throw new Error("User not found");

  }

  const isMatched = await comparePassword(
    payload.password,
    user.password!
  );

  if (!isMatched) {
    throw new Error("Password incorrect");
  }

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

  return {
    accessToken,
    refreshToken
  };
};


const getNewAccessToken = async (token: string) => {
  const decoded: any = verifyToken(
    token,
    config.jwt_refresh_secret
  );

  const accessToken = createToken(
    {
      id: decoded.id
    },
    config.jwt_access_secret,
    config.jwt_access_expires
  );

  return accessToken;
};

export const AuthService = {
  registerUser,
  loginUser,
  getNewAccessToken
};

