import express from "express";
import userRoutes from "./routes/user.route.js";
import { loadModels } from "./services/faceRecognition.service.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./utils/constants.js"
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

loadModels()
  .then(() => {
    console.log("Face recognition models has been loaded");
  })
  .catch((err) => {
    console.error("Error loading Face recognition models", err);
    process.exit(1);
  });

app.use("/api/user", userRoutes);

export default app;