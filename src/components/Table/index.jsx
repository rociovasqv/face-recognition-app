import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Alert, Spinner } from "react-bootstrap";
import attendanceHooks from '../../hooks/useAttendance';

const AttendanceTable = () => {
  const { attendanceRecords, loading, error } = attendanceHooks();
  const navigate = useNavigate();

  const rowClick = (id) => {
    navigate(`/ver-presentismo/${id}`);
  };

  if (loading) {
    return <Spinner animation="border" role="status"></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {attendanceRecords.map((record) => (
          <tr key={record._id} onClick={() => rowClick(record._id)} style={{ cursor: 'pointer' }}>
            <td>{new Date(record.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AttendanceTable;