import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"; 
//import Cards from "./components/Info/Cards";
//import Cards from "./components/Info/Tablas";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { UserContext } from "./contexts";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <Router>
      <Navbar/>
      <Cards/>
      <Tablas/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
