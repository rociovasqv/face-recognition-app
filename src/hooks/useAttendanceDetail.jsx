import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dailyAttendance from "../api/dailyAttendance";

const attendanceDetailHooks = () => {
  const [aDetail, setAdetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getDataDetail = async () => {
      try {
        const res = await dailyAttendance.getById(id);
        setAdetail(res.data);
      } catch (error) {
        console.error(
          "Error al visualizar los datos de la fecha de asistencia",
          error
        );
      }
    };
    getDataDetail();
  }, [id]);

  return { aDetail, setAdetail };
};
export default attendanceDetailHooks;