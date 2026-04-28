"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class ProjectRepository {
    async create(project) {
        const [result] = await client_1.default.query("insert into project (title, description, owner_id) values (?, ?, ?)", [project.title, project.description, project.owner_id]);
        return result.insertId;
    }
    async getProjectsByUser(userId) {
        const [rows] = await client_1.default.query("select * from project WHERE owner_id= ?", [userId]);
        return rows;
    }
    async update(projectId, userId, data) {
        const { title, description } = data;
        const [result] = await client_1.default.query("UPDATE project SET title= ?, description= ? WHERE id= ? AND owner_id= ?", [title, description, projectId, userId]);
        return result.affectedRows;
    }
    async delete(projectId, userId) {
        const [result] = await client_1.default.query("DELETE FROM project WHERE id= ? AND owner_id= ?", [projectId, userId]);
        return result.affectedRows;
    }
}
exports.default = new ProjectRepository();
