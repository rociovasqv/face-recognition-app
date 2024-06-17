import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';


 // Importar los componentes de react-bootstrap

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para la autenticación del usuario
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/"); // Redirecciona al home después de iniciar sesión
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirecciona al home después de cerrar sesión
  };
  //Un pequeño ejemplo, hay que seguir desarrollando, usar <Link> </Link> para urls
  return (
      <ul className="navbar">
        
        <li>
          <Link to="/">Home</Link>
          
        </li>
        {isLoggedIn ? (
           <li>
           <button onClick={handleLogout}>Logout</button>
         </li>
        ) : (
        <li>
          <Link to="/login">
          <button onClick={handleLogin}>Login</button>
          </Link>
        </li>
        )}
      </ul> 
  
  );
};

export default Navbar;