import React from "react";
import useAttendanceDetail from "../hooks/useAttendanceDetail";
import AttendanceDetailTable from "../components/AttendanceDetailTable";

const AttendanceDetail = () => {
  const { detail, error, loading } = useAttendanceDetail();

  return (
    <AttendanceDetailTable data={detail} error={error} loading={loading} />
  );
};

export default AttendanceDetail;