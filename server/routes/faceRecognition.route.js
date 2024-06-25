import { Router } from "express";
import faceRecognitionController from "../controllers/faceRecognition.controller.js";
import { createUpload } from "../utils/functions.js";

const router = Router();
const upload = createUpload();

router.post("/", upload.single("image"), faceRecognitionController.recognizeFace);

export default router;