import { Schema, model } from "mongoose";
import { Status } from "../utils/constants.js";

const dailyAttendanceSchema = new Schema({
  date: { type: Date, required: true },
  attendanceRecords: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: {
        type: String,
        enum: Object.values(Status),
        default: Status.ABSENT,
        required: true,
      },
      checkInTime: { type: Date },
    },
  ],
});

export default model("DailyAttendance", dailyAttendanceSchema);