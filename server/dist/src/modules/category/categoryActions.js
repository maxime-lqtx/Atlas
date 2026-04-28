"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryRepository_1 = __importDefault(require("./categoryRepository"));
const add = async (req, res, next) => {
    try {
        if (!req.body || !req.body.title) {
            res.status(400).json({ message: "Error: bad request !" });
        }
        const newCategory = req.body;
        const insertId = await categoryRepository_1.default.create(newCategory);
        if (!insertId) {
            res.status(403).json({ message: "This project cannot be create !" });
            return;
        }
        res.status(201).json({ insertId });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error !", error });
        return;
    }
};
const readAll = async (req, res, next) => {
    try {
        const categories = await categoryRepository_1.default.findAll();
        if (categories.length === 0) {
            res.status(204).json({ message: "No categories found !" });
            return;
        }
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Server error !" });
        return;
    }
};
exports.default = { add, readAll };
