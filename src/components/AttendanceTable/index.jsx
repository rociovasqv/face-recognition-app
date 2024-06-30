import { EyeIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useAttendance from "../../hooks/useAttendance";
import Alert from "../Alert";

const TABLE_HEAD = ["Fecha", ""];

const AttendanceTable = () => {
  const { attendanceRecords, loading, error } = useAttendance();
  const navigate = useNavigate();

  const rowClick = (id) => {
    navigate(`/ver-presentismo/${id}`);
  };

  return (
    <Card className="my-10 h-full w-full mx-auto">
      {error && <Alert message={error.message} />}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de presentismo
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Mira toda la información sobre los días laborales
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0 overflow-y-scroll px-0">
        {loading ? (
          <div className="flex justify-center items-center h-full my-10">
            <Spinner color="teal" className="h-16 w-16" />
          </div>
        ) : (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map(({ _id, date }, index) => {
                const isLast = index === attendanceRecords.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id} className="even:bg-blue-gray-50/50">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(date).toLocaleDateString()}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Ver día laboral">
                        <IconButton
                          variant="text"
                          onClick={() => rowClick(_id)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
};

export default AttendanceTable;