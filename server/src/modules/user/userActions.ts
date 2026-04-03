import * as argon2 from "argon2";
import type { RequestHandler, Response } from "express";
import type { AuthRequest } from "../../middleware/verifyToken";
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await userRepository.readAll();
    // Respond with the users in JSON format
    res.status(200).json(users);
    return;
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(500).json({ message: "Erreur server !" });
    return;
  }
};

// The R of BREAD - Read operation
const getOneById: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    // console.log(userId);

    const user = await userRepository.read(userId);

    // console.log(user.id);
    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readMe: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next,
) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server Error !" });
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Error bad request !" });
      return;
    }

    // Extract the user data from the request body
    const user = req.body;

    if (!user.email || !user.password) {
      res.status(400).json({ message: "Credentials are missing !" });
      return;
    }

    // verify if the user already exist 
    const existingUser = await userRepository.readByEmail(user.email);

    if (existingUser) {
      res.status(409).json({ message: "This user already exist !" });
      return;
    }


    const hashedPassword = await argon2.hash(user.password);
    // console.log(hashedPassword);

    const newUser = {
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      password: hashedPassword,
      image_url: "http://test.com",
      created_at: new Date(),
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

    if (!insertId) {
      res.status(403).json({ message: "This user cannot be create !" });
      return;
    }
    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server Error !" });
    return;
  }
};

const userToEdit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userData = req.body;

    if (!userData.lastname) {
      res.sendStatus(400);
      return;
    }

    const userIsExist = await userRepository.read(id);

    if (!userIsExist) {
      res.status(404).json({ message: "Error: user doesn't exist" });
      return;
    }

    const result = await userRepository.update(id, userData);

    if (result === 0) {
      res.status(404).json({ message: "User not found !" });
      return;
    }

    res.sendStatus(204).json({ message: "User updated" });
    return;
  } catch (error) {
    // console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error !" });
    }
  }
};

const userToDelete: RequestHandler = async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Error bad request !" });
    }
    const id = Number(req.params.id);

    const result = await userRepository.delete(id);

    if (result === 0) {
      res.status(404).json({ message: "User not found !" });
      return;
    }

    res.status(204).json({ message: "User has been deleted !" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server Error !" });
  }
};

export default { browse, getOneById, readMe, add, userToEdit, userToDelete };
