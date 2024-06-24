
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar"; 
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Card from './components/info/Card';
import Table from './components/info/Table';

import { AuthProvider } from "./contexts/authContext";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

  const [records, setRecords] = useState([
    { name: 'Giselle', lastName: 'Ramirez', dni: '28643862', status: 'absent' },
    { name: 'Andrea', lastName: 'Fernandez', dni: '28643662', status: 'absent' },
    // Otros registros
  ]);

  const handleStatusChange = (dni, status) => {
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.dni === dni ? { ...record, status } : record
      )
    );
  };

const person = { name: 'Giselle', lastName: 'Ramirez', dni: '28643862' };
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/card" element={
            <div>
              <Card person={person} onStatusChange={handleStatusChange} />
              <Table records={records} />
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

