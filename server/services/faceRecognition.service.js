import * as faceapi from 'face-api.js';
import canvas from 'canvas';

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('/weights');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('/weights');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('/weights');
}

export async function recognizeFace(queryImagePath, storedImagePath) {
  const queryImage = await canvas.loadImage(queryImagePath);
  const storedImage = await canvas.loadImage(storedImagePath);

  const queryDescriptors = await faceapi.computeFaceDescriptor(queryImage);
  const storedDescriptors = await faceapi.computeFaceDescriptor(storedImage);

  const distance = faceapi.euclideanDistance(queryDescriptors, storedDescriptors);
  return distance < 0.6; // El umbral depende de tu requerimiento de precisión
}