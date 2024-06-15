import userService from "../services/user.service.js";
import { Roles } from "../utils/enums.js";

/*
  Los controladores son llamados desde las rutas
  Acá no deberia estar la lógica de negocio, para eso están los servicios.
  Acá solamente recibimos información del cliente, validamos, y respondemos nuevamente al cliente.
*/

class UserController {
  async createUser(req, res) {
    try {
      let newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await userService.updatePerson(id, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllUsersByRole(req, res, role) {
    try {
      const users = await userService.getUsersByRole(role);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllManagers(req, res) {
    this.getAllUsersByRole(req, res, Roles.MANAGER);
  }
  async getAllSupervisors(req, res) {
    this.getAllUsersByRole(req, res, Roles.SUPERVISOR);
  }
  async getAllHumanResources(req, res) {
    this.getAllUsersByRole(req, res, Roles.HR);
  }
  async getAllSecretaries(req, res) {
    this.getAllUsersByRole(req, res, Roles.SECRETARY);
  }
  async getAllEmployees(req, res) {
    this.getAllUsersByRole(req, res, Roles.EMPLOYEE);
  }
}

export default new UserController();