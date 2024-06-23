import * as faceapi from 'face-api.js';
import canvas from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import userService from './user.service.js';

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const weightsPath = resolve(__dirname, "..", "weights");

class FaceRecognitionService {
  async loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(weightsPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(weightsPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(weightsPath);
  }

  compareDescriptors(queryDescriptor, storedDescriptors, threshold = 0.6) {
    console.log('Comparing descriptors...');
    for (const { _id, faceDescriptor, fullName } of storedDescriptors) {
      const distance = faceapi.euclideanDistance(queryDescriptor, faceDescriptor);
      console.log(`Distance to user ${fullName}: ${distance}`);
      if (distance < threshold) {
        console.log(`Match found with user ${fullName}`);
        return _id;
      }
    }
    console.log('No match found.');
    return null;
  }

  async recognizeFace(queryImagePath) {
    //Imagen del frontend
    const queryImage = await canvas.loadImage(queryImagePath);
    const queryDescriptor = await faceapi.computeFaceDescriptor(queryImage);
  
    // Obtener descriptores de usuarios almacenados
    const storedDescriptors = await userService.getStoredDescriptors();
    return this.compareDescriptors(queryDescriptor, storedDescriptors);  
  }
}

export default new FaceRecognitionService();