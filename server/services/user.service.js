import User from "../models/user.model.js";
import { Roles } from "../utils/constants.js";
import { encryptPassword } from "../utils/functions.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join, parse } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const facesDir = resolve(__dirname, "..", "faces");
/*
    Los servicios son llamados desde el controlador
    Acá es donde deberia estar toda la lógica de negocio
    Cada servicio debe tener un solo proposito
    estos son algunos que se me ocurrieron que tal vez podamos usar
    a medida que vayamos codificando vamos a darnos cuenta que necesitamos y que no
    son más ideas y ejemplos que otra cosa
*/
class UserService {
  async createUser(userData) {
    const user = new User(userData);
    user.password = await encryptPassword(userData.dni);
    await user.save();
    return user;
  }

  async getUserById(id) {
    return await User.findById(id).select("-password");
  }

  async getUserByEmail(email) {
    return await User.findOne({email})
  }

  async getUsersByRole(role) {
    return await User.find({ role }).select("-password");
  }

  async getAllUsers() {
    return await User.find({}).select("-password");
  }

  async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, {
      new: true,
    }).exec();
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId).exec();
  }

  async getStoredFaceImages() {
    const desiredRoles = [Roles.EMPLOYEE, Roles.SECRETARY];
    const users = await User.find({ role: { $in: desiredRoles } }, { _id: 1, faceImage: 1, firstName: 1, lastName: 1 }).lean();
    
    // Mapea los resultados para asegurar que faceImage sea un Buffer
    const usersWithBufferImages = users.map(user => ({
      _id: user._id, 
      fullName: `${user.firstName} ${user.lastName}`,
      faceImage: user.faceImage instanceof Buffer ? user.faceImage : Buffer.from(user.faceImage.buffer)
    }));
  
    return usersWithBufferImages;
  }

  async getStoredFaceImagesFromFacesFolder() {
    const files = fs.readdirSync(facesDir);
    const storedImages = files.map(file => {
      const filePath = join(facesDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = parse(file).name;

      return {
        _id: fileName,
        faceImage: fileBuffer,
        fullName: fileName, // Assuming the file name represents the full name
      };
    });
    return storedImages;
  }
}

export default new UserService();