"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class MemberRepository {
    async create(member) {
        // j'ai besoin du projectId, du userId et du role
        const { projectId, userId, role } = member;
        const [result] = await client_1.default.query("INSERT INTO member (project_id, user_id, role) VALUES (?,?,?)", [projectId, userId, role]);
        return result.insertId;
    }
    // jointure entre user et member sur le userId ou il y a le projectId
    async findAllByProject(projectId) {
        const [rows] = await client_1.default.query("SELECT u.id, u.firstname, u.lastname, u.email, m.role, m.joined_at FROM user u JOIN member m ON u.id = m.user_id WHERE m.project_id = ?", [projectId]);
        return rows;
    }
    // requête pour vérif l'existence du member
    async isAlreadyExist(newMember) {
        const { projectId, userId } = newMember;
        const [rows] = await client_1.default.query("SELECT * FROM member WHERE project_id = ? AND user_id = ?", [projectId, userId]);
        return rows.length > 0;
    }
}
exports.default = new MemberRepository();
