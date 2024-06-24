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

const App = () => {
  const [records, setRecords] = useState([
    { name: 'Juan', lastName: 'Pérez', dni: '12345678', status: 'absent' },
    // Otros registros
  ]);

  const handleStatusChange = (dni, status) => {
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.dni === dni ? { ...record, status } : record
      )
    );
  };

  const person = { name: 'Juan', lastName: 'Pérez', dni: '12345678' };

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

