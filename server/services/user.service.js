import User from "../models/user.model.js";
import { encryptPassword, generateDefaultPassword } from "../utils/utils.js";
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
    return await User.findById(id);
  }

  async getUserByEmail(email) {
    return await User.findOne({email})
  }

  async getUsersByRole(role) {
    return await User.find({ role });
  }

  async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, {
      new: true,
    }).exec();
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId).exec();
  }

}

export default new UserService();