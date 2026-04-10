import type { RequestHandler } from "express";
import type { AuthRequest } from "../../middleware/verifyToken";
import memberRepository from "../member/memberRepository";
import userRepository from "../user/userRepository";
import type { IMember } from "./member";

const add: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const { email, role } = req.body;
    const projectId = Number(req.params.id);

    if (!email || Number.isNaN(projectId)) {
      res
        .status(400)
        .json({ message: "Bad request: missing email or invalid project ID" });
      return;
    }

    const user = await userRepository.readByEmail(email.toString());

    if (!user) {
      res.status(404).json({ message: "User not found with this email" });
      return;
    }

    const newMember: IMember = {
      userId: Number(user.id),
      projectId: projectId,
      role: role || "editor",
      joined_at: new Date(),
    };

    const isMemberExist = await memberRepository.isAlreadyExist(newMember);

    if (isMemberExist) {
      res
        .status(409)
        .json({ message: "Member already exists in this project" });
      return;
    }

    await memberRepository.create(newMember);

    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);

    const members = await memberRepository.findAllByProject(projectId);

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Server Error !", error });
    return;
  }
};

export default { add, read };
