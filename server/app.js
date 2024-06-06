import express from "express";
import { cors } from "./config/init.js";
import personRoutes from "./routes/person.route.js"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

app.use("/api/person", personRoutes);

export default app;