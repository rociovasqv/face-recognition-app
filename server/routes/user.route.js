import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticateToken, authorize } from "../middleware/middlewares.js";

/* 
    Aca creamos las rutas get, post, put, delete, etc...
    decidimos la url y el controlador el cual va a responder a esa url cuando sea llamado
*/
const router = Router();

router.post("/login", userController.login);
router.post("/logout", authenticateToken, userController.logout);

router.post("/", authenticateToken, authorize, userController.createUser);
router.get("/:id", authenticateToken, authorize, userController.getUserById);
router.put("/:id", authenticateToken, authorize, userController.updateUser);
router.delete("/:id", authenticateToken, authorize, userController.deleteUser);

router.get("/all", authenticateToken, authorize, userController.getAllUsers);
router.get("/managers", authenticateToken, authorize, userController.getAllManagers);
router.get("/supervisors", authenticateToken, authorize, userController.getAllSupervisors);
router.get("/human-resources", authenticateToken, authorize, userController.getAllHumanResources);
router.get("/secretaries", authenticateToken, authorize, userController.getAllSecretaries);
router.get("/employees", authenticateToken, authorize, userController.getAllEmployees);

export default router;