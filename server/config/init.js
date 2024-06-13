import mongoose from "mongoose";
import { VITE_MONGODB_URL } from "./index.js";

const initializeDB = async () => {
  mongoose.connect(VITE_MONGODB_URL);

  mongoose.Promise = global.Promise;
  console.log("Conectado a la base de datos");
};

const cors = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
};

export { initializeDB, cors }