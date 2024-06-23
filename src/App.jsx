import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"; 
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { UserContext } from "./contexts";
//import Card from './components/info/Card';

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card } from "react-bootstrap";


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
          {/* <Route path="/" component={Card} /> */}
          {/* <Route path="/table" element={<Table records={records} />} /> */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
