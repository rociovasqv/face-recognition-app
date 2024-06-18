import * as faceapi from "face-api.js";
import canvas from "canvas";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import userService from "./user.service.js";

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

  /* 
    En el contexto de la detección y reconocimiento facial, un descriptor facial es un vector (una lista de números)
    que representa las características únicas de un rostro. Estos vectores son generados por algoritmos de redes neuronales
    y encapsulan información esencial sobre la apariencia del rostro, como la forma, las distancias entre características faciales (ojos, nariz, boca), y otros detalles.
    Los descriptores faciales permiten comparar diferentes rostros de manera cuantitativa. Al calcular la distancia entre dos
    descriptores faciales, podemos medir cuán similares son dos rostros. Una distancia menor indica mayor similitud.
  */
  async loadStoredDescriptors(storedImages) {
    const descriptors = [];
    for (const { id, imagePath } of storedImages) {
      const image = await canvas.loadImage(imagePath);
      const descriptor = await faceapi.computeFaceDescriptor(image);
      descriptors.push({ id, descriptor });
    }
    return descriptors;
  }

  // Cargar y calcular el descriptor facial de la imagen que sube el usuario desde el frontend
  async getQueryDescriptor(queryImagePath) {
    const queryImage = await canvas.loadImage(queryImagePath);
    return await faceapi.computeFaceDescriptor(queryImage);
  }

  compareDescriptors(queryDescriptor, storedDescriptors, threshold = 0.6) {
    for (const { id, descriptor } of storedDescriptors) {
      const distance = faceapi.euclideanDistance(queryDescriptor, descriptor);
      if (distance < threshold) {
        return id; // Devolver el ID del usuario coincidente
      }
    }
    return null; // No hay coincidencia
  }

  async recognizeFace(queryImagePath) {
    await this.loadModels();

    // Obtener descriptores faciales de las imágenes almacenadas
    const storedImages = await userService.getStoredFaceImages();
    const storedDescriptors = await this.loadStoredDescriptors(storedImages);

    // Obtener descriptor facial de la nueva imagen
    const queryDescriptor = await this.getQueryDescriptor(queryImagePath);

    // Comparar descriptores faciales
    return this.compareDescriptors(queryDescriptor, storedDescriptors);
  }
}

export default new FaceRecognitionService();