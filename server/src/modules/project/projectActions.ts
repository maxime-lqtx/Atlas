import type { RequestHandler, Response } from "express";
import type { AuthRequest } from "../../middleware/verifyToken";
import projectRepository from "./projectRepository";

const read: RequestHandler = async (req: AuthRequest, res: Response, next) => {
  try {
    console.log(req.user);
    if (!req.user) {
      res.status(404).json({ message: "id not found !" });
      return;
    }

    const ownerId = req.user.id;

    const projects = await projectRepository.getProjectsByUser(ownerId);

    if (projects == null) {
      res.status(404).json({ message: "Project not found !" });
      return;
    }
    res.json(projects);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const add: RequestHandler = async (req: AuthRequest, res: Response, next) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "id not found not found !" });
      return;
    }

    const ownerId = req.user.id;
    // console.log(ownerId);

    if (!req.body) {
      res.status(400).json({ message: "Error bad request !" });
      return;
    }

    const project = req.body;

    const newProject = {
      title: project.title,
      description: project.description,
      owner_id: ownerId,
      created_at: new Date(),
    };

    const insertId = await projectRepository.create(newProject);

    if (!insertId) {
      res.status(403).json({ message: "This project cannot be create !" });
    }

    res.status(201).json({ insertId });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server Error !", error });
    return;
  }
};

const projectToEdit: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next,
) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "id not found not found !" });
      return;
    }

    const projectId = Number(req.params.id);
    const userId = req.user.id;

    const { title, description } = req.body;

    const result = await projectRepository.update(projectId, userId, {
      title,
      description,
    });

    if (result === 0) {
      res.status(404).json({ message: "Project not found !" });
      return;
    }

    res.status(200).json({ message: "Project has been updated !" });
  } catch (error) {
    res.status(500).json({ message: "Server error !" });
  }
};

const projectToDelete: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next,
) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "id not found not found !" });
      return;
    }

    const projectId = Number(req.params.id);
    const userId = req.user.id;

    const result = await projectRepository.delete(projectId, userId);
    // console.log(result);

    if (result === 0) {
      res
        .status(403)
        .json({ message: "Error: you cannot delete this project" });
      return;
    }

    res.status(204).json({ message: "The project has benn deleted !" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server Error !" });
    return;
  }
};

export default { read, add, projectToEdit, projectToDelete };
