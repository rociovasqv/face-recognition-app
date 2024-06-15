/* eslint-disable no-undef */
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../.env.local") });

const PORT = process.env.VITE_PORT_BACKEND || 5000;
const VITE_MONGODB_URL = process.env.VITE_MONGODB_URL;
const VITE_SECRET_KEY = process.env.VITE_PROCESS_KEY;

export { PORT, VITE_MONGODB_URL, VITE_SECRET_KEY };