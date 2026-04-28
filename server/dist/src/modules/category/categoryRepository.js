"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
class CategoryRepository {
    async create(category) {
        const [result] = await client_1.default.query("INSERT INTO category (title) VALUES (?)", [category]);
        return result.insertId;
    }
    async findAll() {
        const [rows] = await client_1.default.query("SELECT * from category");
        return rows;
    }
}
exports.default = new CategoryRepository();
