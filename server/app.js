import express from "express";
import { cors } from "./config/init.js";
import userRoutes from "./routes/user.route.js";
import { loadModels } from "./services/faceRecognition.service.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Para leer cookies
app.use(express.json());
app.use(cors);

loadModels()
  .then(() => {
    console.log("Modelos de reconocimiento facial cargados");
  })
  .catch((err) => {
    console.error("Error al cargar los modelos de reconocimiento facial", err);
    process.exit(1);
  });

app.use("/api/user", userRoutes);

export default app;