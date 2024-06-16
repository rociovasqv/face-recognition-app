export const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

export const Roles = {
  MANAGER: "manager", //Gerente
  SUPERVISOR: "supervisor", //Encargado
  HR: "hr", //RRHH
  SECRETARY: "secretary", //Secretaria
  EMPLOYEE: "employee" //Empleados
};