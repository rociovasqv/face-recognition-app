import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Alert from "../components/Alert";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    submitLogin,
    error,
    loading,
  } = useLogin();
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await submitLogin(e);
    } catch (err) {
      console.error("Error en el login:", err);
      navigate("/not-found", {
        state: { isErrorRole: false, message: err.message },
      });
    }
  };

  return (
    <Card className="p-5 mt-20" shadow={false}>
      {error.general && <Alert message={error.general} />}
      <Typography variant="h4" color="blue-gray">
        Iniciar sesión
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        ¡Por favor, ingresa tu correo y contraseña!
      </Typography>
      <form
        className="mt-6 w-80 max-w-screen-lg sm:w-96"
        onSubmit={onSubmitLogin}
      >
        <div className="mb-1 flex flex-col gap-6">
          <div>
            <Input
              type="email"
              size="lg"
              color="teal"
              label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@email.com"
              error={error.email.length > 0}
              required
            />
            {error.email.length > 0 && (
              <Typography
                variant="small"
                color="red"
                className="mt-2 ml-1 font-normal"
              >
                {error.email}
              </Typography>
            )}
          </div>
          <div>
            <Input
              type="password"
              color="teal"
              size="lg"
              label="Contraseña"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error.password.length > 0}
              required
            />
            {error.password.length > 0 && (
              <Typography
                variant="small"
                color="red"
                className="mt-1 ml-1 font-normal"
              >
                {error.password}
              </Typography>
            )}
          </div>
        </div>
        <Button type="submit" color="teal" className="mt-6" loading={loading} fullWidth>
          Ingresar
        </Button>
      </form>
    </Card>
  );
};

export default Login;