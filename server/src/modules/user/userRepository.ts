import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { IUser } from "./user";

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<IUser, "id" | "created_at">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstname, lastname, email, password, image_url) values (?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.image_url,
      ],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the user
    return (rows[0] as IUser) || null;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all IUsers from the "IUser" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of users
    return rows as IUser[];
  }

  // Read the user by email
  async readByEmail(email: string): Promise<IUser | null> {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "SELECT * from user WHERE email= ?",
      [email],
    );
    return rows[0] as IUser;
  }

  // The U of CRUD - Update operation

  async update(id: number, user: Partial<IUser>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname= ?, lastname= ?, email= ?, password= ?, image_url= ? WHERE id = ?",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.image_url,
        id,
      ],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id= ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
