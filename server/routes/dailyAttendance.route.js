import { Router } from "express";
import dailyAttendanceController from "../controllers/dailyAttendance.controller.js";
import { authenticateToken, authorize } from "../middleware/middlewares.js";
import { Roles } from "../utils/constants.js";

const router = Router();

router.post("/", authenticateToken, authorize, dailyAttendanceController.create);
router.get("/:id", authenticateToken, authorize, dailyAttendanceController.getById);
router.get("/date/:date", authenticateToken, authorize, dailyAttendanceController.getByDate);
router.get("/", authenticateToken, authorize, dailyAttendanceController.getAll);
router.put("/:id", authenticateToken, authorize, dailyAttendanceController.update);
router.delete("/:id", authenticateToken, authorize, dailyAttendanceController.delete);
router.post("/mark-present", 
    //authenticateToken, 
    //authorize([Roles.SECRETARY, Roles.EMPLOYEE]), 
    dailyAttendanceController.markUserPresent);

export default router;