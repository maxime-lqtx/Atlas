"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = __importDefault(require("../../src/auth/controller/authController"));
const userRepository_1 = __importDefault(require("../../src/modules/user/userRepository"));
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
    };
}
describe("Auth Controller - login", () => {
    it("succes : 200 + token", async () => {
        const req = {
            body: { email: "test@test.com", password: "123" },
        };
        const res = mockResponse();
        // on force les retours des mocks (tout est ok)
        userRepository_1.default.readByEmail.mockResolvedValue({
            email: "test@test.com",
            id: 1,
        });
        argon2_1.default.verify.mockResolvedValue(true);
        jsonwebtoken_1.default.sign.mockReturnValue("fake_token");
        process.env.SECRET_KEY = "secret";
        await authController_1.default.login(req, res, jest.fn());
        // verifie la reponse
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Success: User connected !" }));
    });
    it("erreur : 401 si mauvais password", async () => {
        const req = {
            body: { email: "test@test.com", password: "wrong" },
        };
        const res = mockResponse();
        // simulation : user trouve mais mot de passe invalide
        userRepository_1.default.readByEmail.mockResolvedValue({
            password: "hash",
        });
        argon2_1.default.verify.mockResolvedValue(false);
        await authController_1.default.login(req, res, jest.fn());
        // verifie l'erreur
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
    });
});
