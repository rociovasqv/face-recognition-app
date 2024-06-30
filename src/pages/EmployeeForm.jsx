import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../api/user";
import { Roles } from "../data/constants";
import { Card, Typography, Input, Select, Button, Option } from "@material-tailwind/react";

const EmployeeForm = ({ isEdit = false }) => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    role: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      const getOneEmployee = async () => {
        setLoading(true);
        try {
          const res = await UserService.getUserById(id);
          setEmployee(res.data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || "Error al cargar empleado");
          setLoading(false);
        }
      };
      getOneEmployee();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setEmployee({ ...employee, [name]: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        const { image, ...restEmployee } = employee;
        await UserService.updateUser(id, restEmployee);
      } else {
        const formData = new FormData();
        const data = {
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          dni: employee.dni,
          role: employee.role,
        };
        formData.append("image", employee.image);
        formData.append("data", JSON.stringify(data));
        await UserService.createUser(formData);
      }
      navigate("/empleados");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Error al ${isEdit ? "actualizar" : "crear"} empleado`
      );
      setLoading(false);
    }
  };

console.log(employee)
  return (
    <Card className="p-5 mt-20" shadow={false}>
      {error && <Alert message={error.message} />}
      <Typography variant="h4" color="blue-gray">
        {isEdit ? "Editar" : "Crear"} empleado
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        ¡Por favor, {isEdit ? "actualice" : "rellene"} los datos del empleado!
      </Typography>

      <form
        className="mt-6 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Input
            size="lg"
            color="teal"
            label="Nombre/s"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="Ingresa nombre"
            name="firstName"
            required
          />
          <Input
            size="lg"
            color="teal"
            label="Apellido/s"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Ingresa apellido"
            name="lastName"
            required
          />
          <Input
            size="lg"
            type="email"
            color="teal"
            label="Email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Ingresa email"
            name="email"
            required
          />

          <Input
            size="lg"
            color="teal"
            label="DNI"
            value={employee.dni}
            onChange={handleChange}
            placeholder="Ingresa DNI"
            name="dni"
            required
          />

          <Select
            label="Rol"
            color="teal"
            name="role"
            value={employee.role}
            onChange={(val) => {
                let event = {
                    target: {
                        name: "role",
                        value: val
                    }
                }
                handleChange(event)
            }}
            required
          >
            {Object.values(Roles).map((roleValue) => (
              <Option key={roleValue} value={roleValue}>
                {roleValue}
              </Option>
            ))}
          </Select>

          {!isEdit && (
            <Input
              label="Imagen"
              type="file"
              name="image"
              accept=".jpg, .jpeg"
              onChange={handleChange}
            />
          )}
        </div>

        <Button
          type="submit"
          color="teal"
          className="mt-6"
          loading={loading}
          fullWidth
        >
          {isEdit ? "Actualizar" : "Crear"}
        </Button>
      </form>
    </Card>
  );
};

export default EmployeeForm;