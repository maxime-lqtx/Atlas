import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { ITask } from "./task";

class TaskRepository {
  async create(task: Omit<ITask, "id" | "created_at">) {
    const {
      title,
      description,
      status,
      priority,
      project_id,
      created_by,
      assigned_to,
      category_id,
    } = task;
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO task (title, description, status, priority, project_id, created_by, assigned_to, category_id) VALUES (?,?,?,?,?,?,?,?)",
      [
        title,
        description,
        status,
        priority,
        project_id,
        created_by,
        assigned_to,
        category_id,
      ],
    );

    return result.insertId;
  }

  // Join for tasks by project with category name
  async findAllByProject(projectId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT t.*, c.title as category_name FROM task t LEFT JOIN category c ON t.category_id = c.id WHERE t.project_id= ?",
      [projectId],
    );

    return rows as ITask[];
  }

  async updateStatus(id: number, status: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE task SET status = ? WHERE id = ?",
      [status, id],
    );

    return result.affectedRows;
  }

  // A faire

  // update(){}

  // delete(){}
}

export default new TaskRepository();
