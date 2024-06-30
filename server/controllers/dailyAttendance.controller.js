import dailyAttendanceService from "../services/dailyAttendance.service.js";

class DailyAttendanceController {
  async create(req, res) {
    try {
      await dailyAttendanceService.create();
      res.status(201).json({ message: "Daily attendance record created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const dailyAttendance = await dailyAttendanceService.getById(id);
      if (!dailyAttendance) {
        return res.status(404).json({ message: "Daily attendance record not found" });
      }
      res.status(200).json(dailyAttendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getByDate(req, res) {
    try {
      const { date } = req.params;
      const dailyAttendance = await dailyAttendanceService.getByDate(new Date(date));
      if (!dailyAttendance) {
        return res.status(404).json({ message: "Daily attendance record not found" });
      }
      res.status(200).json(dailyAttendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getByDatePopulate(req, res) {
    try {
      const { date } = req.params;
      const dailyAttendance = await dailyAttendanceService.getByDatePopulate(new Date(date));
      if (!dailyAttendance) {
        return res.status(404).json({ message: "Daily attendance record not found" });
      }
      res.status(200).json(dailyAttendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const dailyAttendances = await dailyAttendanceService.getAll();
      res.status(200).json(dailyAttendances);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedDailyAttendance = await dailyAttendanceService.update(id, updateData);
      if (!updatedDailyAttendance) {
        return res.status(404).json({ message: "Daily attendance record not found" });
      }
      res.status(200).json(updatedDailyAttendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedDailyAttendance = await dailyAttendanceService.delete(id);
      if (!deletedDailyAttendance) {
        return res.status(404).json({ message: "Daily attendance record not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async markUserPresent(req, res) {
    try {
      const { date, userId } = req.body;
      await dailyAttendanceService.markUserPresent(new Date(date), userId);
      res.status(200).json({ message: `User ${userId} marked as present` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new DailyAttendanceController();