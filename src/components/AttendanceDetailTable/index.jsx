import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import Alert from "../Alert";
import { ChipStatus } from "../ChipStatus";

const TABLE_HEAD = ["Empleado", "DNI", "Estado", "Hora de entrada"];

const AttendanceDetailTable = ({ data, error, loading }) => {
  const detailDate = new Date(data?.date).toLocaleDateString();
  return (
    <Card className="my-10 h-full w-full mx-auto">
      {error && <Alert message={error.message} />}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Detalles de Asistencia del día {detailDate}
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
              {data?.attendanceRecords?.map((userRecord, index) => {
                const fullName = `${userRecord.userId.firstName} ${userRecord.userId.lastName}`;
                const isLast = index === data.attendanceRecords.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={userRecord.userId._id} className="even:bg-blue-gray-50/50">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fullName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {userRecord.userId.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {userRecord.userId.dni}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <ChipStatus status={userRecord.status} />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {userRecord.checkInTime
                          ? new Date(userRecord.checkInTime).toLocaleTimeString()
                          : "N/A"
                        }
                      </Typography>
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

export default AttendanceDetailTable;