import User from "../models/user.model.js";
import { Roles } from "../utils/constants.js";
import { encryptPassword, generateDefaultPassword } from "../utils/functions.js";

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
    user.password = generateDefaultPassword(userData.firstName, userData.lastName, userData.dni);
    user.password = await encryptPassword(user.password);
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
    const users = await User.find({ role: { $in: desiredRoles } }, { _id: 1, faceImage: 1 }).lean();
    return users.map(user => ({
      id: user._id.toString(),
      imagePath: user.faceImage
    }));
  }
}

export default new UserService();