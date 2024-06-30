import { Typography } from "@material-tailwind/react";
import Videocam from "../components/Videocam/index";

function Attendance() {
  return (
    <>
      <Typography variant="h1" className="mt-10 text-teal-500">
        Presentismo
      </Typography>
      <Videocam />
    </>
  );
}

export default Attendance;