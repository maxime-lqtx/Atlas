import type { RequestHandler } from "express";
import type { AuthRequest } from "../../middleware/verifyToken";
import memberRepository from "../member/memberRepository";
import type { IMember } from "./member";

const add: RequestHandler = async (req: AuthRequest, res) => {
  // j'ai besoin de quoi ?
  // récup le projectId , le userId, et le role défini.
  // check si le member existe déjà => retrun
  // sinon creation d'un new member

  try {
    if (!req.body) {
      res.status(400).json({ message: "Error bad request !" });
      return;
    }

    const projectId = req.params.id;
    const newMember: IMember = {
      userId: Number(req.body.userId),
      role: req.body.role || "editor",
      projectId: Number(projectId),
      joined_at: new Date(),
    };

    const isMemberExist = await memberRepository.isAlreadyExist(newMember);

    if (isMemberExist) {
      res.status(409).json({ message: "This member is already exist !" });
      return;
    }

    const result = await memberRepository.create(newMember);

    if (!result) {
      res.status(500).json({ message: "Cannot added this user" });
      return;
    }

    res.status(201).json({ message: "Member added successfully !" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server Error !", error });
    return;
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
