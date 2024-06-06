import { Schema, model } from "mongoose";

/* 
    - subject: referencia a la materia a la que pertenece la clase
    - present: referencias a los estudiantes presentes en la clase
    - absent: referencias a los estudiantes ausentes en la clase
*/

const classSchema = new Schema({
  date: { type: Date, required: true },
  subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  present: [{ type: Schema.Types.ObjectId, ref: "Person" }],
  absent: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

export default model("Class", classSchema);
