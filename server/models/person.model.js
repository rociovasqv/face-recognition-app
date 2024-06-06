import { Schema, model } from "mongoose";

/* 
  - role: indica si es profesor o alumno
  - studentId: solo tendra esa propiedad si es alumno (se refiere al legajo) ***
  - dni: solo tendrá esa propiedad si es profesor, ya que el profesor no tiene legajo (creo)  ***
  - coursesTaugth: almacena referencias a las materias que dicta el profesor.
  - coursesAttended: almacena referencias a las materias en las que está inscrito el estudiante

  ***NOTA: Ver si es mejor que sea tipo number en vez de string esta propiedad
*/

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "teacher"] },
  studentId: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  dni: {
    type: String,
    required: function () {
      return this.role === "teacher";
    },
  },
  coursesTaught: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  coursesAttended: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
});

export default model("Person", personSchema);
