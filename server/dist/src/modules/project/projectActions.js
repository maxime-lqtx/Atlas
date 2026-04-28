"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectRepository_1 = __importDefault(require("./projectRepository"));
const read = async (req, res, next) => {
    try {
        console.log(req.user);
        if (!req.user) {
            res.status(404).json({ message: "id not found !" });
            return;
        }
        const ownerId = req.user.id;
        const projects = await projectRepository_1.default.getProjectsByUser(ownerId);
        res.json(projects);
    }
    catch (error) {
        next(error);
        console.log(error);
    }
};
const add = async (req, res, next) => {
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
        if (!req.body.title) {
            res.status(400).json({ message: "Error: title is missing !" });
            return;
        }
        const project = req.body;
        const newProject = {
            title: project.title,
            description: project.description,
            owner_id: ownerId,
            created_at: new Date(),
        };
        const insertId = await projectRepository_1.default.create(newProject);
        if (!insertId) {
            res.status(403).json({ message: "This project cannot be create !" });
        }
        res.status(201).json({ insertId });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server Error !", error });
        return;
    }
};
const projectToEdit = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(404).json({ message: "id not found not found !" });
            return;
        }
        const projectId = Number(req.params.id);
        const userId = req.user.id;
        const { title, description } = req.body;
        const result = await projectRepository_1.default.update(projectId, userId, {
            title,
            description,
        });
        if (result === 0) {
            res.status(404).json({ message: "Project not found !" });
            return;
        }
        res.status(200).json({ message: "Project has been updated !" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error !" });
    }
};
const projectToDelete = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(404).json({ message: "id not found not found !" });
            return;
        }
        const projectId = Number(req.params.id);
        const userId = req.user.id;
        const result = await projectRepository_1.default.delete(projectId, userId);
        // console.log(result);
        if (result === 0) {
            res
                .status(403)
                .json({ message: "Error: you cannot delete this project" });
            return;
        }
        res.status(204).json({ message: "The project has benn deleted !" });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error !" });
        return;
    }
};
exports.default = { read, add, projectToEdit, projectToDelete };
