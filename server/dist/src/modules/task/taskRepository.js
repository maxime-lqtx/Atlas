"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class TaskRepository {
    async create(task) {
        const { title, description, status, priority, project_id, created_by, assigned_to, category_id, } = task;
        const [result] = await client_1.default.query("INSERT INTO task (title, description, status, priority, project_id, created_by, assigned_to, category_id) VALUES (?,?,?,?,?,?,?,?)", [
            title,
            description,
            status,
            priority,
            project_id,
            created_by,
            assigned_to,
            category_id,
        ]);
        return result.insertId;
    }
    // Join for tasks by project with category name
    async findAllByProject(projectId) {
        const [rows] = await client_1.default.query("SELECT t.*, c.title as category_name FROM task t LEFT JOIN category c ON t.category_id = c.id WHERE t.project_id= ?", [projectId]);
        return rows;
    }
    async updateStatus(id, status) {
        const [result] = await client_1.default.query("UPDATE task SET status = ? WHERE id = ?", [status, id]);
        return result.affectedRows;
    }
}
exports.default = new TaskRepository();
