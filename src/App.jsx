import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/createEmployeeForm";
import EditEmployee from "./pages/EditEmployeeForm";
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
