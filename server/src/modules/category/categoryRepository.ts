import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { ICategory } from "./category";

class CategoryRepository {
  async create(category: Omit<ICategory, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO category (title) VALUES (?)",
      [category],
    );

    return result.insertId;
  }

  async findAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * from category");

    return rows;
  }
}

export default new CategoryRepository();
