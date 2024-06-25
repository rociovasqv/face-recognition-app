import { useState, useEffect } from "react";
import UserService from "../api/user";
import { useParams } from "react-router-dom";

const editEmployeeHooks = () =>
    {
        const [employee, setEmployee] = useState({
            firstName: "",
            lastName: "",
            email: "",
            dni: "",
            role: ""
          });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState({ error: false, message: "" });
        const { id } = useParams();
        
        useEffect(() => {
            const getOneEmployee = async () => {
                setLoading(true);
            try {
                const res = await UserService.getUserById(id);
                setEmployee(res.data);
                setLoading(false);
            } catch (err) {
                setError({ error: true, message: err.response?.data?.message || "Error al cargar usuario" });
                setLoading(false);
            }
            };
            getOneEmployee();
        }, [id]);

        const submitEdit = async () => {
            setLoading(true);
            setError({ error: false, message: "" });

            try {
                await UserService.updateUser(id, employee);
              } catch(err) {
                setError({ error: true, message: err.response?.data?.message || "Error al actualizar usuario" });
                setLoading(false);
              }
        }

        return { employee, setEmployee, loading, setLoading, error, setError, submitEdit };
    }

export default editEmployeeHooks;
