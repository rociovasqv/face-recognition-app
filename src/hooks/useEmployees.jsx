import { useEffect, useState } from "react";
import UserService from "../api/user";

const useEmployees = () =>
    {
        const [employees, setEmployees] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error,setError] = useState(null);

        useEffect( ()=>
            {
                const getEmployees = async () =>
                {
                    try{
                        const res = await UserService.getAllUsers();
                        setEmployees(res.data);
                        setLoading(false)
                    }
                    catch(error){
                        setError(error);
                        setLoading(false);
                    }
                };
                getEmployees();
            }, []);

            const deleteEmployee = async (id) =>
                {
                   try{
                    await UserService.deleteUser(id);
                    setEmployees(
                        (prevEmployees) => prevEmployees.filter(employee => employee.id !== id)
                    );
                   }
                   catch(err){
                    console.error('Error al eliminar el usuario:', err);
                   }
                }
            return { employees, setEmployees, loading, setLoading, error, setError, deleteEmployee };   
    }

    export default useEmployees;