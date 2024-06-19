import { Router } from "express";
import faceRecognitionController from "../controllers/faceRecognition.controller.js";
import { authenticateToken, authorize } from "../middleware/middlewares.js";
import { Roles } from "../utils/constants.js";
import { createUpload } from "../utils/functions.js";

const router = Router();
const upload = createUpload();

router.post(
  "/",
  //authenticateToken,
  //authorize([Roles.SECRETARY, Roles.EMPLOYEE]),
  upload.single("image"),
  faceRecognitionController.recognizeFace
);

export default router;