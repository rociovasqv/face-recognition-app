import { Router } from "express";
import userController from "../controllers/user.controller.js";

/* 
    Aca creamos las rutas get, post, put, delete, etc...
    decidimos la url y el controlador el cual va a responder a esa url cuando sea llamado
*/
const router = Router();

router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.get("/managers", userController.getAllManagers);
router.get("/supervisors", userController.getAllSupervisors);
router.get("/human-resources", userController.getAllHumanResources);
router.get("/secretaries", userController.getAllSecretaries);
router.get("/employees", userController.getAllEmployees);

export default router;