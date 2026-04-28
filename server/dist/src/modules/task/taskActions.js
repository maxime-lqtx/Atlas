"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskRepository_1 = __importDefault(require("./taskRepository"));
const read = async (req, res, next) => {
    try {
        if (!req.params) {
            res.status(404).json({ message: "id not found !" });
            return;
        }
        const projectId = req.params.id;
        const tasks = await taskRepository_1.default.findAllByProject(Number(projectId));
        res.status(200).json(tasks);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server Error !", error });
        return;
    }
};
const add = async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(400).json({ message: "Error bad request !" });
            return;
        }
        const taskData = req.body;
        const { title, description, status, priority, project_id, assigned_to, category_id, } = taskData;
        if (!req.user) {
            res.status(404).json({ message: "id not found !" });
            return;
        }
        const created_by = req.user.id;
        const insertId = await taskRepository_1.default.create({
            title,
            description,
            status,
            priority,
            project_id,
            created_by,
            assigned_to,
            category_id,
        });
        if (!insertId) {
            res.status(403).json({ message: "This task cannot be create !" });
        }
        res.status(201).json({ insertId });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server Error !", error });
        return;
    }
};
const updateStatus = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);
        const projectStatus = req.body.status;
        const isUpdated = await taskRepository_1.default.updateStatus(projectId, projectStatus);
        if (!isUpdated) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Status has been updated !" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error !" });
        return;
    }
    // A faire
    // update(){}
    // delete(){}
};
exports.default = { read, add, updateStatus };
