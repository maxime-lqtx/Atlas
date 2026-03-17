import express from "express";
import authController from "./auth/controller/authController";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// user root
router.get("/users", userActions.browse);
router.get("/user/:id", userActions.read);
router.post("/users", userActions.add);
router.put("/user/:id", userActions.userToEdit);
router.delete("/user/:id", userActions.userToDelete);

// login root
router.post("/login", authController.login);

/* ************************************************************************* */

export default router;
