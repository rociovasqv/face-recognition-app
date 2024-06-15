import mongoose from "mongoose";
import { VITE_MONGODB_URL } from "./index.js";

const initializeDB = async () => {
  mongoose.connect(VITE_MONGODB_URL);

  mongoose.Promise = global.Promise;
  console.log("Conectado a la base de datos");
};

export { initializeDB }