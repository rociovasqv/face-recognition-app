import {Schema, model} from "mongoose";

const captureSchema = new Schema({
  image: { type: Buffer, required: true },
  timestamp: { type: Date, default: Date.now },
});

const saveCapturedModel = model('saveCaptureModel', captureSchema);

export default saveCapturedModel;