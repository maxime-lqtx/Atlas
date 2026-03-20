import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { IMember, IMemberWithUser } from "./member";

class MemberRepository {
  async create(member: Omit<IMember, "id" | "joined_at">) {
    // j'ai besoin du projectId, du userId et du role
    const { projectId, userId, role } = member;
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO member (project_id, user_id, role) VALUES (?,?,?)",
      [projectId, userId, role],
    );

    return result.insertId;
  }

  // jointure entre user et member sur le userId ou il y a le projectId
  async findAllByProject(projectId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT u.id, u.firstname, u.lastname, u.email, m.role, m.joined_at FROM user u JOIN member m ON u.id = m.user_id WHERE m.project_id = ?",
      [projectId],
    );

    return rows as IMemberWithUser[];
  }

  // requête pour vérif l'existence du member
  async isAlreadyExist(newMember: IMember) {
    const { projectId, userId } = newMember;
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM member WHERE project_id = ? AND user_id = ?",
      [projectId, userId],
    );

    return rows.length > 0;
  }
}

export default new MemberRepository();
