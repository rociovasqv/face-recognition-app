import React from "react";
import { Table } from "react-bootstrap";
import attendanceDetailHooks from "../hooks/useAttendanceDetail";

const AttendanceDetail = () => {
  const { aDetail } = attendanceDetailHooks();

  if (!aDetail) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>
        Detalles de Asistencia para {new Date(aDetail.date).toLocaleDateString()}
      </h2>
      <Table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Hora de Entrada</th>
          </tr>
        </thead>
        <tbody>
        {aDetail.attendanceRecords.map((userRecord, index) => (
            <tr key={index}>
              <td>
                {userRecord.userId 
                  ? `${userRecord.userId.firstName} ${userRecord.userId.lastName}`
                  : "Usuario no encontrado"}
              </td>
              <td>{userRecord.status === "present" ? "✔️" : "❌"}</td>
              <td>
                {userRecord.checkInTime
                  ? new Date(userRecord.checkInTime).toLocaleTimeString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AttendanceDetail;