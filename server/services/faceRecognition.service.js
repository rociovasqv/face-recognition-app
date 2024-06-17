import * as faceapi from "face-api.js";
import canvas from "canvas";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const weightsPath = resolve(__dirname, "..", "weights");

export async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(weightsPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(weightsPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(weightsPath);
}

export async function recognizeFace(queryImagePath, storedImagePath) {
  const queryImage = await canvas.loadImage(queryImagePath);
  const storedImage = await canvas.loadImage(storedImagePath);

  const queryDescriptors = await faceapi.computeFaceDescriptor(queryImage);
  const storedDescriptors = await faceapi.computeFaceDescriptor(storedImage);

  const distance = faceapi.euclideanDistance(
    queryDescriptors,
    storedDescriptors
  );
  return distance < 0.6; // El umbral depende de tu requerimiento de precisión
}