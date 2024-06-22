import { useState } from "react";
import UserService from "../api/user";

const loginHooks = () =>
    {
      const [email, setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [error, setError] = useState({ error: false, message: "" });
      const [loading, setLoading] = useState(false);
  
      const submmitLogin = async (e) =>
        {
          e.preventDefault();
          setLoading(true);
          setError({ error: false, message: "" });
          try {
            if (!email.trim()) throw {message: "Es obligatorio rellenar el campo"};

            const response = await UserService.login( {email, password} );
            console.log("Login exitoso:", response.data);
            // Aquí puedes redirigir al usuario a otra página o realizar alguna acción adicional
          } catch (error) {
            console.error("Error en el login:", error);
            // Manejo de errores (mostrar mensaje de error al usuario, etc.)
          }
          finally{
            setLoading(false)
          }
        }
        return { email, setEmail, password, setPassword, submmitLogin, error, loading }
      };

      export default loginHooks;