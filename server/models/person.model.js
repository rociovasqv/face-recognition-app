import { Schema, model } from "mongoose";
import { Roles } from "../utils/enums";
import { isStudent, isTeacher } from "../utils/validationHelpers";

/*
  - role: indica si es profesor o alumno
  - photo: la foto con la cual vamos a basarnos para hacer face recognition
  - studentId: solo tendra esa propiedad si es alumno (se refiere al legajo) ***
  - dni: solo tendrá esa propiedad si es profesor, ya que el profesor no tiene legajo (creo) ***
  - subjectTaught: almacena referencias a las materias que dicta el profesor.
  - subjectAttended: almacena referencias a las materias en las que está inscrito el estudiante

  ***NOTA: Ver si es mejor que sea tipo number en vez de string esta propiedad
*/

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  photo: {
    type: String,
    required: isStudent,
  },
  studentId: {
    type: String,
    required: isStudent,
  },
  dni: {
    type: String,
    required: isTeacher,
  },
  subjectTaught: [
    { type: Schema.Types.ObjectId, ref: "Subject", validate: isTeacher },
  ],
  subjectAttended: [
    { type: Schema.Types.ObjectId, ref: "Subject", validate: isStudent },
  ],
});

export default model("Person", personSchema);
