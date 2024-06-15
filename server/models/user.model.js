import { Schema, model } from "mongoose";
import { Roles } from "../utils/enums.js";
import bcrypt from "bcryptjs";
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
  faceImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);