import { Schema, model } from "mongoose";
import { Roles } from "../utils/constants.js";
import validator from "validator";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true },
  dni: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  faceDescriptor: { type: [Number] },
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);