"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memberRepository_1 = __importDefault(require("../member/memberRepository"));
const userRepository_1 = __importDefault(require("../user/userRepository"));
const add = async (req, res) => {
    try {
        const { email, role } = req.body;
        const projectId = Number(req.params.id);
        if (!email || Number.isNaN(projectId)) {
            res
                .status(400)
                .json({ message: "Bad request: missing email or invalid project ID" });
            return;
        }
        const user = await userRepository_1.default.readByEmail(email.toString());
        if (!user) {
            res.status(404).json({ message: "User not found with this email" });
            return;
        }
        const newMember = {
            userId: Number(user.id),
            projectId: projectId,
            role: role || "editor",
            joined_at: new Date(),
        };
        const isMemberExist = await memberRepository_1.default.isAlreadyExist(newMember);
        if (isMemberExist) {
            res
                .status(409)
                .json({ message: "Member already exists in this project" });
            return;
        }
        await memberRepository_1.default.create(newMember);
        res.status(201).json({ message: "Member added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
const read = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);
        const members = await memberRepository_1.default.findAllByProject(projectId);
        res.status(200).json(members);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error !", error });
        return;
    }
};
exports.default = { add, read };
