import { useState, useEffect } from "react";
import EmployeesTable from "../components/EmployeesTable";
import UserService from "../api/user";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setLoading(true);
        const res = await UserService.getAllUsers();
        setEmployees(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      await UserService.deleteUser(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeesTable
      data={employees}
      loading={loading}
      error={error}
      deleteAction={deleteEmployee}
    />
  );
};

export default Employees;