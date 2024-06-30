import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dailyAttendance from "../api/dailyAttendance";

const useAttendanceDetail = () => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getDataDetail = async () => {
      try {
        setLoading(true);
        const res = await dailyAttendance.getById(id);
        setDetail(res.data);
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false);
      }
    };
    getDataDetail();
  }, [id]);

  return { detail, setDetail, error, loading };
};

export default useAttendanceDetail;