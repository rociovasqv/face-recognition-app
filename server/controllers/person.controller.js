import personService from "../services/person.service.js";

/*
  Los controladores son llamados desde las rutas
  Acá no deberia estar la lógica de negocio, para eso están los servicios.
  Acá solamente recibimos información del cliente, validamos, y respondemos nuevamente al cliente.
*/
class PersonController {

  async createStudent(req, res) {
    try {
      let newStudent = await personService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTeacher(req, res) {
    try {
      let newTeacher = await personService.createTeacher(req.body);
      res.status(201).json(newTeacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPersonById(req, res) {
    try {
      const { id } = req.params;
      const person = await personService.getPersonById(id);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePerson(req, res) {
    try {
      const { id } = req.params;
      const personData = req.body;
      const updatedPerson = await personService.updatePerson(id, personData);
      if (!updatedPerson) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.status(200).json(updatedPerson);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deletePerson(req, res) {
    try {
      const { id } = req.params;
      const deletedPerson = await personService.deletePerson(id);
      if (!deletedPerson) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addSubjectToPerson(req, res) {
    try {
      const { id, subjectId } = req.params;
      const updatedPerson = await personService.addSubjectToPerson(id, subjectId);
      res.status(200).json(updatedPerson);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeSubjectFromPerson(req, res) {
    try {
      const { id, classId } = req.params;
      const updatedPerson = await personService.removeClassFromPerson(id, classId);
      res.status(200).json(updatedPerson);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new PersonController();