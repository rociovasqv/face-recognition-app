import { jsonInstance } from "./htttp-comon";

const baseUrl = "/daily-attendance";
const http = jsonInstance;

class DailyAttendanceService {
  async createDailyAttendance(data) {
    return await http.post(`${baseUrl}/`, data);
  }

  async getById(id) {
    return await http.get(`${baseUrl}/${id}`);
  }

  async getByDate(date) {
    const formattedDate = date.toISOString().split('T')[0];
    return await http.get(`${baseUrl}/date/${formattedDate}`);
  }

  async getAll() {
    return await http.get(`${baseUrl}/`);
  }

  async update(id, data) {
    return await http.put(`${baseUrl}/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`${baseUrl}/${id}`);
  }

  async markUserPresent(userId) {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    return await http.post(`${baseUrl}/mark-present`, { date: formattedDate, userId });
  }
}

export default new DailyAttendanceService();