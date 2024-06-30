import { useContext, useState } from "react";
import UserService from "../api/user";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError({
        email: "",
        password: "",
        general: "",
      });
      if (!email.trim())
        throw new Error(
          "Es obligatorio rellenar el campo de correo electrónico"
        );
      if (!password.trim())
        throw new Error("Es obligatorio rellenar el campo de contraseña");

      const response = await UserService.login({ email, password });
      setUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      const errorResponse = err.response.data;
      setError((prevErrors) => ({
        ...prevErrors,
        [errorResponse.field]: errorResponse.message,
      }));
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    submitLogin,
    error,
    loading,
  };
};

export default useLogin;