import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { IProject } from "./project";

class ProjectRepository {
  async create(project: Omit<IProject, "id" | "created_at">) {
    const [result] = await databaseClient.query<Result>(
      "insert into project (title, description, owner_id) values (?, ?, ?)",
      [project.title, project.description, project.owner_id],
    );

    return result.insertId;
  }

  async getProjectsByUser(userId: number) {
    const [rows] = await databaseClient.query<Result>(
      "select * from project WHERE owner_id= ?",
      [userId],
    );
    return rows;
  }

  async update(projectId: number, userId: number, data: Partial<IProject>) {
    const { title, description } = data;
    const [result] = await databaseClient.query<Result>(
      "UPDATE project SET title= ?, description= ? WHERE id= ? AND owner_id= ?",
      [title, description, projectId, userId],
    );

    return result.affectedRows;
  }

  async delete(projectId: number, userId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM project WHERE id= ? AND owner_id= ?",
      [projectId, userId],
    );

    return result.affectedRows;
  }
}

export default new ProjectRepository();
