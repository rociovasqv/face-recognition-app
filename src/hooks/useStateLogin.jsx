import { useContext, useState } from "react";
import UserService from "../api/user";
import { AuthContext } from "../contexts/authContext";

const loginHooks = () =>
    {
      const [email, setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [error, setError] = useState({ error: false, message: "" });
      const [loading, setLoading] = useState(false);
      const { setUser, setIsAuthenticated } = useContext(AuthContext);
  
      const submitLogin = async (e) =>
        {
          e.preventDefault();
          setLoading(true);
          setError({ error: false, message: "" });
          try {
            if (!email.trim()) throw new Error("Es obligatorio rellenar el campo de correo electrónico");
            if (!password.trim()) throw new Error("Es obligatorio rellenar el campo de contraseña");

            const response = await UserService.login( {email, password} );
            setUser(response.data);
            setIsAuthenticated(true); 
            console.log("Login exitoso:", response.data);
            // Aquí puedes redirigir al usuario a otra página o realizar alguna acción adicional
          } catch (error) {
            console.error("Error en el login:", error);
            setError({ error: true, message: error.message || "Error desconocido" });
            // Manejo de errores (mostrar mensaje de error al usuario, etc.)
          }
          finally{
            setLoading(false)
          }
        }
        return { email, setEmail, password, setPassword, submitLogin, error, loading }
      };

      export default loginHooks;