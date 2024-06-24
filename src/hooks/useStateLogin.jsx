import { useState } from "react";
import UserService from "../api/user";
import { useUser } from "../contexts";


const loginHooks = () =>
    {
      const [email, setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [error, setError] = useState({ error: false, message: "" });
      const [loading, setLoading] = useState(false);
      const { setUser, setIsAuthenticated } = useUser();
  
      const submmitLogin = async (e) =>
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
            return true; // Login exitoso
    
          } catch (error) {
            if (error.response)
              {
                if (error.response.data.message.includes("correo"))
                  {
                    setError({ error: true, message: "Correo electrónico incorrecto" });
                  }
                else if (error.response.data.message.includes("contraseña")) 
                    {
                    setError({ error: true, message: "Contraseña incorrecta" });
                  }
                else {
                  setError({ error: true, message: error.message || "Correo electrónico o contraseña incorrectos" });
                }
              }
              else {
                setError({ error: true, message: error.message || "Error desconocido" });
              }
              return false; //Login fallido
            }
            finally{
            setLoading(false)
          }
        }
        return { email, setEmail, password, setPassword, submmitLogin, error, loading };
      };

      export default loginHooks;