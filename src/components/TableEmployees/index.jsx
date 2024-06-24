import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import useEmployees from "../../hooks/useEmployees";
import { useNavigate } from "react-router-dom";

const TableEmployees = () => {
  const { employees, setEmployees, loading, error, deleteEmployee } = useEmployees();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="primary"
        disabled={loading}
        onClick={() => navigate("/create-employee")}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Crear"}
      </Button>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <Button
                  color="primary"
                  onClick={() => navigate(`/edit-employee/${employee.id}`)}
                >
                  Editar
                </Button>{" "}
                <Button
                  color="danger"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableEmployees;