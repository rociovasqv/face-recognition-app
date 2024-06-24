import mongoose from "mongoose";
import { VITE_MONGODB_URL } from "./index.js";
import faceRecognitionService from "../services/faceRecognition.service.js";
import dailyAttendanceService from "../services/dailyAttendance.service.js";
import cron from "node-cron";

const initializeDB = async () => {
  try {
    await mongoose.connect(VITE_MONGODB_URL);
    mongoose.Promise = global.Promise;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const initializeFaceRecognitionModels = async () => {
  try {
    await faceRecognitionService.loadModels();
    console.log("Face recognition models have been loaded");
  } catch (error) {
    console.error("Error loading face recognition models", error);
    process.exit(1);
  }
};

const initializeDailyAttendance = async () => {
  await dailyAttendanceService.create();
};

const initializeDailyAttendanceCron = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      await dailyAttendanceService.create();
    } catch (error) {
      console.error("Error executing initializeDailyAttendance:", error);
    }
  });
};

export {
  initializeDB,
  initializeFaceRecognitionModels,
  initializeDailyAttendance,
  initializeDailyAttendanceCron,
};