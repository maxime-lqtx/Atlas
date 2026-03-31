import argon2 from "argon2";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authController from "../../src/auth/controller/authController";
import userRepository from "../../src/modules/user/userRepository";

// on remplace les modules par des versions fictives (mocks)
jest.mock("../../src/modules/user/userRepository");
jest.mock("argon2");
jest.mock("jsonwebtoken");

// simule l'objet de reponse express
function mockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  } as unknown as Response;
}

describe("Auth Controller - login", () => {
  it("succes : 200 + token", async () => {
    const req = {
      body: { email: "test@test.com", password: "123" },
    } as Request;
    const res = mockResponse();

    // on force les retours des mocks (tout est ok)
    (userRepository.readByEmail as jest.Mock).mockResolvedValue({
      email: "test@test.com",
      id: 1,
    });
    (argon2.verify as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake_token");
    process.env.SECRET_KEY = "secret";

    await authController.login(req, res, jest.fn());

    // verifie la reponse
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Success: User connected !" }),
    );
  });

  it("erreur : 401 si mauvais password", async () => {
    const req = {
      body: { email: "test@test.com", password: "wrong" },
    } as Request;
    const res = mockResponse();

    // simulation : user trouve mais mot de passe invalide
    (userRepository.readByEmail as jest.Mock).mockResolvedValue({
      password: "hash",
    });
    (argon2.verify as jest.Mock).mockResolvedValue(false);

    await authController.login(req, res, jest.fn());

    // verifie l'erreur
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
  });
});
