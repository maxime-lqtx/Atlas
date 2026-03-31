import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../../modules/user/userRepository";

const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    // req.body exist ?
    if (!req.body) {
      res.status(400).json({ message: "Error bad request !" });
      return;
    }

    // get email and password
    const { email, password } = req.body;
    // console.log(req.body);

    const emailIsExist = await userRepository.readByEmail(email);
    // console.log(emailIsExist);
    //  if email doesn't exist
    if (!emailIsExist) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isValidPassword = await argon2.verify(
      emailIsExist.password,
      password,
    );

    // if the password is good ?
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Handle typescript error on the .env
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    // if all good? generate jwt
    const token = jwt.sign(
      {
        user_id: emailIsExist.id,
        user_email: emailIsExist.email,
        role: "user",
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    // console.log(token);

    // send token in cookies
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "Success: User connected !",
      user: {
        firstname: emailIsExist.firstname,
        email: emailIsExist.email,
        token: token,
      },
    });
  } catch (error) {
    // console.error("Erreur on login:", error);
    res.status(500).json({ message: "Error server !" });
  }
};

const logout: RequestHandler = (req, res) => {
  // clear le token sur tout le domaine
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Success: User disconnected !" });
};

export default { login, logout };
