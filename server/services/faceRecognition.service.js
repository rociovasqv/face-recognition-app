import * as faceapi from 'face-api.js';
import canvas from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import userService from './user.service.js';
import { bufferToImage } from '../utils/functions.js';

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

  async loadStoredDescriptors(storedImages) {
    const descriptors = [];
    for (const { _id, faceImage, fullName } of storedImages) {
      const userInfo = `${_id} - ${fullName}`;
      try {
        const image = await bufferToImage(faceImage);
        if (!image || image.width <= 0 || image.height <= 0) {
          console.log(`Invalid image for user: ${userInfo}`);
          continue;
        }

        console.log(`Image loaded for user: ${userInfo}`);

        const detection = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }));
        console.log(detection)
        if (detection) {
          const descriptor = await faceapi.computeFaceDescriptor(image);
          if (descriptor) {
            console.log(`Descriptor obtained for user: ${userInfo}`);
            descriptors.push({ id: _id, descriptor });
          } else {
            console.log(`No descriptor found for user: ${userInfo}`);
          }
        } else {
          console.log(`No face detected for user: ${userInfo}`);
        }
      } catch (error) {
        console.error(`Error processing image for user: ${userInfo}`, error);
      }
    }
    return descriptors;
  }

  async getQueryDescriptor(queryImagePath) {
    try {
      console.log(`Loading query image from: ${queryImagePath}`);
      const queryImage = await canvas.loadImage(queryImagePath);

      // Debugging image data
      console.log('Query image loaded:', queryImage);
      if (!queryImage) {
        throw new Error('Failed to load query image');
      }

      if (queryImage.width <= 0 || queryImage.height <= 0) {
        throw new Error('Invalid query image dimensions');
      }

      const detection = await faceapi.detectSingleFace(canvasElement, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }));
      console.log("Detection result for query image:", detection);
      if (detection) {
        return await faceapi.computeFaceDescriptor(canvasElement);
      } else {
        console.log('No face detected in query image.');
        return null;
      }
    } catch (error) {
      console.error('Error processing query image:', error);
      throw error; // Propagate the error further if necessary
    }
  }

  compareDescriptors(queryDescriptor, storedDescriptors, threshold = 0.6) {
    console.log('Comparing descriptors...');
    for (const { id, descriptor } of storedDescriptors) {
      const distance = faceapi.euclideanDistance(queryDescriptor, descriptor);
      console.log(`Distance to user ID ${id}: ${distance}`);
      if (distance < threshold) {
        console.log(`Match found with user ID: ${id}`);
        return id;
      }
    }
    console.log('No match found.');
    return null;
  }

  async recognizeFace(queryImagePath) {
    console.log('Starting face recognition...');
    await this.loadModels();

    const storedImages = await userService.getStoredFaceImages();
    console.log('Stored images retrieved.');
    
    const storedDescriptors = await this.loadStoredDescriptors(storedImages);
    console.log('Stored descriptors loaded.');

    const queryDescriptor = await this.getQueryDescriptor(queryImagePath);
    if (!queryDescriptor) {
      throw new Error('No face detected in query image');
    }

    console.log('Query descriptor obtained.');
    return this.compareDescriptors(queryDescriptor, storedDescriptors);
  }
}

export default new FaceRecognitionService();