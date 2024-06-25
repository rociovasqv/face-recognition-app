import React from "react";
import Videocam from "../components/Videocam/index";

function AttendanceCamera() {
  return (
    <div>
      <div className="homeHeader">
        <h1>Presentismo</h1>
      </div>
      <div className="homeBody">
        <Videocam />
      </div>
    </div>
  );
}

export default AttendanceCamera;