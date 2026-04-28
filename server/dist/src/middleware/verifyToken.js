"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = __importDefault(require("../modules/user/userRepository"));
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.access_token;
        // console.log(token);
        if (!token) {
            res.status(401).json({ message: "Action non autorisée" });
            return;
        }
        const tokenDecode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "sqddfDFG%qGKfgfù!Dfghgfhd$");
        const userisExist = await userRepository_1.default.readByEmail(tokenDecode.user_email);
        if (!userisExist) {
            res.status(401).json({ message: "Action non autorisée" });
            return;
        }
        req.user = userisExist;
        next();
    }
    catch (error) {
        console.error("Erreur VerifyToken:", error);
        res.status(500).json({
            message: "Erreur serveur",
            error: error instanceof Error ? error.message : error,
        });
        return;
    }
};
exports.verifyToken = verifyToken;
