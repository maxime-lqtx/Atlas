import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body || !req.body.title) {
      res.status(400).json({ message: "Error: bad request !" });
    }
    const newCategory = req.body;

    const insertId = await categoryRepository.create(newCategory);

    if (!insertId) {
      res.status(403).json({ message: "This project cannot be create !" });
      return;
    }
    res.status(201).json({ insertId });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error !", error });
    return;
  }
};

const readAll: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.findAll();

    if (categories.length === 0) {
      res.status(204).json({ message: "No categories found !" });
      return;
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error !" });
    return;
  }
};

export default { add, readAll };
