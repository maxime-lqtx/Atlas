import express from "express";
import authController from "./auth/controller/authController";
import { verifyToken } from "./middleware/verifyToken";
import categoryActions from "./modules/category/categoryActions";
import projectActions from "./modules/project/projectActions";
import taskActions from "./modules/task/taskActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// user root
router.get("/users", userActions.browse);
router.get("/user/:id", userActions.read);
router.put("/user/:id", userActions.userToEdit);
router.delete("/user/:id", userActions.userToDelete);

// register root
router.post("/users", userActions.add);

// login root
router.post("/login", authController.login);
router.get("/me", verifyToken, userActions.readMe);

// project root
router.get("/projects", verifyToken, projectActions.read);
router.post("/projects", verifyToken, projectActions.add);
router.put("/project/:id", verifyToken, projectActions.projectToEdit);
router.delete("/project/:id", verifyToken, projectActions.projectToDelete);

// Category root
router.get("/categories", categoryActions.readAll);
router.post("/categories", categoryActions.add);
// update et delete à faire

// Task root
router.get("/projects/:id/tasks", verifyToken, taskActions.read);
router.post("/tasks", verifyToken, taskActions.add);
router.patch("/tasks/:id/status", verifyToken, taskActions.updateStatus);
//  update et delete à faire

/* ************************************************************************* */

export default router;
