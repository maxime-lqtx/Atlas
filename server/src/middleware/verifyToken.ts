import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { IUser } from "../modules/user/user";
import userRepository from "../modules/user/userRepository";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.access_token;
    // console.log(token);

    if (!token) {
      res.status(401).json({ message: "Action non autorisée" });
      return;
    }

    const tokenDecode = jwt.verify(
      token,
      process.env.SECRET_KEY || "sqddfDFG%qGKfgfù!Dfghgfhd$",
    ) as { user_id: string; user_email: string; role: string };

    const userisExist = await userRepository.readByEmail(
      tokenDecode.user_email,
    );

    if (!userisExist) {
      res.status(401).json({ message: "Action non autorisée" });
      return;
    }

    req.user = userisExist;
    next();
  } catch (error) {
    console.error("Erreur VerifyToken:", error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error instanceof Error ? error.message : error,
    });
    return;
  }
};
