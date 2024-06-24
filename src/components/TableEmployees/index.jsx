import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import useEmployees from "../../hooks/useEmployees";
import { useNavigate } from "react-router-dom";

const TableEmployees = () => {
  const { employees, setEmployees, loading, error, deleteEmployee } = useEmployees();
  const navigate = useNavigate();
  console.log(employees)

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <Button
                  color="primary"
                  onClick={() => navigate(`/edit-employee/${employee._id}`)}
                >
                  Editar
                </Button>{" "}
                <Button
                  color="danger"
                  onClick={() => deleteEmployee(employee._id)}
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