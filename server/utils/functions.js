import bcrypt from "bcryptjs";
import { VITE_SECRET_KEY } from "../config/index.js";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";
import sharp from 'sharp';
import { createCanvas, loadImage } from 'canvas';

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (rawPassword, encryptedPassword) => {
  return await bcrypt.compare(rawPassword, encryptedPassword);
};

export const generateJwt = (user) => {
  jwt.sign({ id: user._id, role: user.role }, VITE_SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyJwt = (token) => {
  return jwt.verify(token, VITE_SECRET_KEY);
};

export const createUpload = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({ storage });
}

export const bufferToImage = async (buffer) => {
  try {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('El parámetro no es un buffer válido.');
    }

    // Usa Sharp para convertir el buffer a un formato adecuado para canvas
    const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });

    // Crea un objeto Image de canvas con los datos de la imagen
    const image = createCanvas(info.width, info.height);
    const ctx = image.getContext('2d');
    const imageData = ctx.createImageData(info.width, info.height);
    imageData.data.set(data);
    ctx.putImageData(imageData, 0, 0);

    return image; // Devuelve el objeto Image de canvas
  } catch (err) {
    console.error('Error al convertir la imagen:', err);
    throw err; // Reenvía el error para manejarlo donde se llame a esta función
  }
}