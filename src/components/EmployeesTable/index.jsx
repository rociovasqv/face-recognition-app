import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";
import RoleChip from "../RoleChip";

const TABLE_HEAD = ["Empleado", "DNI", "Rol", "Fecha de contratación", ""];
const EmployeesTable = ({data, error, loading, deleteAction }) => {
  const navigate = useNavigate();

  return (
    <Card className="my-10 h-full w-full mx-auto">
      {error && <Alert message={error.message} />}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de empleados
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Mira toda la información sobre los empleados
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => navigate("/crear-empleado")}
              className="flex items-center gap-3"
              variant="gradient"
              color="green"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar
              empleado
            </Button>
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
              {data.map(
                (
                  { _id, firstName, lastName, email, dni, role, createdAt },
                  index
                ) => {
                  const fullName = `${firstName} ${lastName}`;
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id} className="even:bg-blue-gray-50/50">
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
                              {email}
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
                            {dni}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <RoleChip role={role} />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(createdAt).toLocaleString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Editar empleado">
                          <IconButton
                            variant="text"
                            onClick={() => navigate(`/editar-empleado/${_id}`)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Eliminar empleado">
                          <IconButton
                            variant="text"
                            onClick={() => deleteAction(_id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
};

export default EmployeesTable;