import Person from "../models/person.model.js";
import { Roles } from "../utils/enums.js";

/*
    Los servicios son llamados desde el controlador
    Acá es donde deberia estar toda la lógica de negocio
    Cada servicio debe tener un solo proposito
    estos son algunos que se me ocurrieron que tal vez podamos usar
    a medida que vayamos codificando vamos a darnos cuenta que necesitamos y que no
    son más ideas y ejemplos que otra cosa
*/

class PersonService {
  async createPerson(personData) {
    const person = new Person(personData);
    await person.save();
    return person;
  }

  async createStudent(studentData) {
    studentData.role = Roles.STUDENT;
    const student = await this.createPerson(studentData);
    return student;
  }

  async createTeacher(teacherData) {
    teacherData.role = Roles.TEACHER;
    const teacher = await this.createPerson(teacherData);
    return teacher;
  }

  async getPersonById(id) {
    return await Person.findById(id)
      .populate("coursesTaught coursesAttended")
      .exec();
  }

  async getUsersByRole(role) {
    return await Person.find({ role })
      .populate("coursesTaught coursesAttended")
      .exec();
  }

  async updatePerson(personId, personData) {
    return await Person.findByIdAndUpdate(personId, personData, {
      new: true,
    }).exec();
  }

  async deletePerson(personId) {
    return await Person.findByIdAndDelete(personId).exec();
  }

  async addSubjectToPerson(personId, subjectId) {
    const person = await this.getPersonById(personId)
    if (!person) throw new Error("Person not found");

    if (person.role === Roles.TEACHER) {
      person.subjectTaught.push(subjectId);
    } else if (person.role === Roles.STUDENT) {
      person.subjectAttended.push(subjectId);
    }

    await person.save();
    return person;
  }

  async removeSubjectFromPerson(personId, subjectId) {
    const person = await this.getPersonById(personId);
    if (!person) throw new Error("Person not found");

    if (person.role === Roles.TEACHER) {
      person.subjectTaught = person.subjectTaught.filter(
        (subject) => subject.toString() !== subjectId
      );
    } else if (person.role === Roles.STUDENT) {
      person.subjectAttended = person.subjectAttended.filter(
        (subject) => subject.toString() !== subjectId
      );
    }

    await person.save();
    return person;
  }
}

export default new PersonService();