import { Schema, model } from "mongoose";

const dailyAttendanceSchema = new Schema({
  date: { type: Date, required: true },
  attendanceRecords: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      status: { type: String, enum: ['present', 'absent'], default: 'absent', required: true },
      checkInTime: { type: Date }
  }]
});

export default model("DailyAttendance", dailyAttendanceSchema);