"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class UserRepository {
    // The C of CRUD - Create operation
    async create(user) {
        // Execute the SQL INSERT query to add a new user to the "user" table
        const [result] = await client_1.default.query("insert into user (firstname, lastname, email, password, image_url) values (?, ?, ?, ?, ?)", [
            user.firstname,
            user.lastname,
            user.email,
            user.password,
            user.image_url,
        ]);
        // Return the ID of the newly inserted user
        return result.insertId;
    }
    // The Rs of CRUD - Read operations
    async read(id) {
        // Execute the SQL SELECT query to retrieve a specific user by its ID
        const [rows] = await client_1.default.query("select * from user where id = ?", [id]);
        // Return the first row of the result, which represents the user
        return rows[0] || null;
    }
    async readAll() {
        // Execute the SQL SELECT query to retrieve all IUsers from the "IUser" table
        const [rows] = await client_1.default.query("select * from user");
        // Return the array of users
        return rows;
    }
    // Read the user by email
    async readByEmail(email) {
        const [rows] = await client_1.default.query("SELECT * from user WHERE email= ?", [email]);
        return rows[0];
    }
    // The U of CRUD - Update operation
    async update(id, user) {
        const [result] = await client_1.default.query("UPDATE user SET firstname= ?, lastname= ?, email= ?, password= ?, image_url= ? WHERE id = ?", [
            user.firstname,
            user.lastname,
            user.email,
            user.password,
            user.image_url,
            id,
        ]);
        return result.affectedRows;
    }
    // The D of CRUD - Delete operation
    async delete(id) {
        const [result] = await client_1.default.query("DELETE FROM user WHERE id= ?", [id]);
        return result.affectedRows;
    }
}
exports.default = new UserRepository();
