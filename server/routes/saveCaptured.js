import { Router } from "express";
import saveCaptured from "../controllers/saveCaptured.controller";

const router = Router();

router.post('/saveCaptured', saveCaptured)

export default router;