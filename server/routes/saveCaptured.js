import { Router } from "express";
import { multer } from "../utils/functions"

const router = Router();

router.post('/saveCaptured', multer.single('image'))

export default router;