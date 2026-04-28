"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./auth/controller/authController"));
const verifyToken_1 = require("./middleware/verifyToken");
const categoryActions_1 = __importDefault(require("./modules/category/categoryActions"));
const memberActions_1 = __importDefault(require("./modules/member/memberActions"));
const projectActions_1 = __importDefault(require("./modules/project/projectActions"));
const taskActions_1 = __importDefault(require("./modules/task/taskActions"));
const userActions_1 = __importDefault(require("./modules/user/userActions"));
const router = express_1.default.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// user root
router.get("/users", userActions_1.default.browse);
router.get("/user/:id", userActions_1.default.getOneById);
router.patch("/user/:id", userActions_1.default.userToEdit);
router.delete("/user/:id", userActions_1.default.userToDelete);
// register root
router.post("/users", userActions_1.default.add);
// login root
router.post("/login", authController_1.default.login);
router.get("/me", verifyToken_1.verifyToken, userActions_1.default.readMe);
router.post("/logout", authController_1.default.logout);
// project root
router.get("/projects", verifyToken_1.verifyToken, projectActions_1.default.read);
router.post("/projects", verifyToken_1.verifyToken, projectActions_1.default.add);
router.put("/project/:id", verifyToken_1.verifyToken, projectActions_1.default.projectToEdit);
router.delete("/project/:id", verifyToken_1.verifyToken, projectActions_1.default.projectToDelete);
// Category root
router.get("/categories", categoryActions_1.default.readAll);
router.post("/categories", categoryActions_1.default.add);
// update et delete à faire
// Task root
router.get("/projects/:id/tasks", verifyToken_1.verifyToken, taskActions_1.default.read);
router.post("/tasks", verifyToken_1.verifyToken, taskActions_1.default.add);
router.patch("/tasks/:id/status", verifyToken_1.verifyToken, taskActions_1.default.updateStatus);
//  update et delete à faire
// member root
router.post("/projects/:id/members", verifyToken_1.verifyToken, memberActions_1.default.add);
router.get("/projects/:id/members", verifyToken_1.verifyToken, memberActions_1.default.read);
// update et delete à faire
/* ************************************************************************* */
exports.default = router;
