import express from "express";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.get("/users", userActions.browse);
router.get("/user/:id", userActions.read);
router.post("/users", userActions.add);
router.put("/user/:id", userActions.userToEdit);
router.delete("/user/:id", userActions.userToDelete);

/* ************************************************************************* */

export default router;
