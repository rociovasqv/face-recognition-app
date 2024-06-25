import { useEffect, useState } from "react";
import DailyAttendanceService from "../api/dailyAttendance";


const attendanceHooks = () =>
    {
        const [attendanceRecords, setAttendanceRecords] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

useEffect(() =>
    {
        const getAttendance = async () =>
            {
                try{
                    const res = await DailyAttendanceService.getAll();
                    setAttendanceRecords(res.data);
                }
                catch(error){
                    setError("Error al visualizar la tabla de asistencia")
            }finally{
                setLoading(false);
            }
        }
            getAttendance();
    }, []);
    return { attendanceRecords, loading, error};
    };

    export default attendanceHooks;

