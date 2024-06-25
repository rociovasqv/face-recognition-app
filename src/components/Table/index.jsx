import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Alert, Spinner } from "react-bootstrap";
import attendanceHooks from '../../hooks/useAttendance';

const AttendanceTable = () => {
  const { attendanceRecords, loading, error } = attendanceHooks();
  const navigate = useNavigate();

  const rowClick = (id) => {
    navigate(`/attendance/${id}`);
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Cargando...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {attendanceRecords.map((record) => (
          <tr key={record._id} onClick={() => rowClick(record._id)} style={{ cursor: 'pointer' }}>
            <td>{new Date(record.date).toLocaleDateString()}</td>
            <td>
              {record.attendanceRecords.map((userRecord, index) => (
                <div key={index}>
                  {userRecord.userId} - {userRecord.status === "present" ? "✔️" : "❌"}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default AttendanceTable;
