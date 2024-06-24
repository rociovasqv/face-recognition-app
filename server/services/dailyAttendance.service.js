import DailyAttendance from "../models/dailyAttendance.model.js";
import { Roles, Status } from "../utils/constants.js";
import userService from "./user.service.js";

class DailyAttendanceService {
  async create() {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const existingRecord = await DailyAttendance.findOne({
      date: { $gte: startOfDay },
    });

    if (!existingRecord) {
      const users = await userService.getUsersByRoles([
        Roles.EMPLOYEE,
        Roles.SECRETARY,
      ]);
      const attendanceRecords = users.map((user) => ({
        userId: user._id,
        status: Status.ABSENT,
      }));

      const dailyAttendance = new DailyAttendance({
        date: today,
        attendanceRecords,
      });

      await dailyAttendance.save();
      console.log("Daily attendance record created");
      return dailyAttendance;
    } else {
      console.log("Daily attendance record already exists");
    }
  }

  async getById(id) {
    return await DailyAttendance.findById(id).populate(
      "attendanceRecords.userId",
      "-password"
    );
  }

  async getByDate(date) {
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    return await DailyAttendance.findOne({
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate("attendanceRecords.userId", "-password");
  }

  async getAll() {
    return await DailyAttendance.find().populate(
      "attendanceRecords.userId",
      "-password"
    );
  }

  async update(id, updateData) {
    return await DailyAttendance.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async delete(id) {
    return await DailyAttendance.findByIdAndDelete(id);
  }

  async markUserPresent(date, userId) {
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const dailyAttendance = await DailyAttendance.findOne({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (dailyAttendance) {
      const record = dailyAttendance.attendanceRecords.find(
        (record) => record.userId.toString() === userId.toString()
      );

      if (record) {
        record.status = Status.PRESENT;
        record.checkInTime = new Date();
        await dailyAttendance.save();
        console.log(`User ${userId} marked as present`);
      } else {
        console.log(`User ${userId} not found in attendance records`);
      }
    } else {
      console.log("Daily attendance record not found for the specified date");
    }
  }
}

export default new DailyAttendanceService();