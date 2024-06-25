import * as faceapi from 'face-api.js';
import canvas from 'canvas';
import { encryptPassword } from './utils/functions.js';
import path from 'path';
import User from "./models/user.model.js";
import DailyAttendance from './models/dailyAttendance.model.js'; 
import { fileURLToPath } from 'url';

const { Canvas, Image, ImageData, createCanvasElement, createImageElement } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData, createCanvasElement, createImageElement });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const facesPath = path.join(__dirname, 'faces');
const modelsPath = path.join(__dirname, 'weights');

const getFaceDescriptor = async (imagePath) => {
  try {
    const img = await canvas.loadImage(imagePath);
    const detections = await faceapi.detectSingleFace(img, getFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

    if (!detections) {
      throw new Error('No face detected');
    }

    const { width, height } = detections.detection.box;
    if (width <= 0 || height <= 0) {
      throw new Error(`Invalid bounding box dimensions: width (${width}), height (${height})`);
    }

    return detections.descriptor;
  } catch (error) {
    console.error(`Error processing image at ${imagePath}: ${error.message}`);
    return null;
  }
};

const loadModels = async (modelsPath) => {
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelsPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
};

const getFaceDetectorOptions = () => {
  return new faceapi.TinyFaceDetectorOptions({
    inputSize: 160, // Puedes ajustar el tamaño de entrada según tus necesidades
    scoreThreshold: 0.5 // Puedes ajustar el umbral de puntuación según tus necesidades
  });
};

export const seedUsers = async () => {
  await loadModels(modelsPath);

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const dailyAttendance = await DailyAttendance.findOne({
    date: { $gte: startOfDay },
  });

  const usersData = [
    {
      firstName: "Stefano",
      lastName: "Ferrari",
      email: "stefanoferrari.dev@gmail.com",
      dni: "40238311",
      role: "secretary",
      faceImage: 'stefano.jpg'
    },
    {
      firstName: "Rocio",
      lastName: "Vasquez Vargas",
      email: "rovv.tech@outlook.com",
      dni: "42796963",
      role: "secretary",
      faceImage: 'rocio.jpg'
    },
    {
      firstName: "Giselle",
      lastName: "Ramirez",
      email: "evelynmdp@hotmail.com",
      dni: "28643862",
      role: "secretary",
      faceImage: 'giselle.jpg'
    },
    {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      dni: "123456",
      role: "manager"
    },
    {
      firstName: "RRHH",
      lastName: "RRHH",
      email: "rrhh@rrhh.com",
      dni: "123456",
      role: "hr"
    }
  ];

  for (const userData of usersData) {
    const defaultPassword = userData.dni;
    const hashedPassword = await encryptPassword(defaultPassword);

    if(userData.role === "secretary" || userData.role === "employee"){
      const faceImagePath = path.join(facesPath, userData.faceImage);
      const faceDescriptor = await getFaceDescriptor(faceImagePath);
      if (faceDescriptor) {
        const newUser = new User({
          ...userData,
          faceDescriptor: Array.from(faceDescriptor),
          password: hashedPassword,
          createdAt: new Date(),
        });
  
        await newUser.save();
        console.log(`User ${userData.firstName} ${userData.lastName} created successfully`);
        if (!dailyAttendance.attendanceRecords.some(user => user.userId.equals(savedUser._id))) {
          dailyAttendance.attendanceRecords.push({ userId: savedUser._id, status: "absent" });
        }
      } else {
        console.log(`No face detected for ${userData.firstName} ${userData.lastName}`);
      }
    } else {
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
      });

      await newUser.save();
      console.log(`User ${userData.firstName} ${userData.lastName} created successfully`);
      if (!dailyAttendance.attendanceRecords.some(user => user.userId.equals(savedUser._id))) {
        dailyAttendance.attendanceRecords.push({ userId: savedUser._id, status: "absent" });
      }
    }
  }

  await dailyAttendance.save();
};