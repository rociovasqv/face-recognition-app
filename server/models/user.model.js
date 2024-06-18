import mongoose, { Schema, model } from "mongoose";
import { Roles } from "../utils/constants.js";
import validator from "validator";

const usuarioSchema = Schema;

const userSchema = new usuarioSchema({
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
  faceImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userModel = model("User", userSchema)

export default userModel;