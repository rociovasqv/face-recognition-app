import Person from "../models/person.model.js";

/*
    Los servicios son llamados desde el controlador
    Acá es donde deberia estar toda la lógica de negocio
    Cada servicio debe tener un solo proposito
    estos son algunos que se me ocurrieron que tal vez podamos usar
    a medida que vayamos codificando vamos a darnos cuenta que necesitamos y que no
    son más ideas y ejemplos que otra cosa
*/

export class PersonService {
    
    async createPerson(personData) {
        //Ejemplo, tal vez haya que hacer cambios
        const person = new Person(personData);
        await person.save();
        return person;
    }
      
    // async getPersonById(id) {

    // }
    
    // async getPersonsByClass(courseId, isTeacher = false) {

    // }
    
    // async getUsersByRole(role) {
    
    // }
    
    // async updatePerson(personId, personData) {
    
    // }
    
    // async addClassToPerson(personId, classId, isTeacher = false) {
    //   //segun el rol agregarlo
    // }
    
    // async removeClassFromPerson(personId, classId, isTeacher = false) {
    
    // }
    
    // async deletePerson(personId) {
    
    // }    
}
