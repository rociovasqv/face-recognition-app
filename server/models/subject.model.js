import { Schema, model } from "mongoose";

/* 
  name: nombre de la materia
  teachers: referencias a los profesores que dictan la materia (Puede haber casos de tener más de un profesor en una materia)
  students: referencias a los estudiantes inscritos en la materia

  ***NOTA: Deberia haber una clase que se llame comision? Charlar sobre esto
*/

const subjectSchema = new Schema({
  name: { type: String, required: true },
  teachers: [{ type: Schema.Types.ObjectId, ref: "Person" }],
  students: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

export default model("Subject", subjectSchema);
