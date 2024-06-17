import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { Button } from "react-bootstrap";


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
           <Button type="button" className="btn btn-outline-light" onClick={handleLogout}>Logout</Button>
         </li>
        ) : (
        <li>
          <Link to="/login">
          <Button type="button" className="btn btn-outline-light" onClick={handleLogin}>Login</Button>
          </Link>
        </li>
        )}
      </ul> 
  
  );
};

export default Navbar;