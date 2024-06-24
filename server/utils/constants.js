export const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const Roles = {
  MANAGER: "manager", //Gerente
  SUPERVISOR: "supervisor", //Encargado
  HR: "hr", //RRHH
  SECRETARY: "secretary", //Secretaria
  EMPLOYEE: "employee", //Empleados
};

export const Status = {
  PRESENT: "present",
  ABSENT: "absent"
}