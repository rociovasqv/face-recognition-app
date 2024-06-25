import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/createEmployeeForm";
import EditEmployee from "./pages/EditEmployeeForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/authContext";
import Attendance from "./pages/Attendance";
import AttendanceCamera from "./pages/AttendanceCamera";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presentismo" element={<AttendanceCamera />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/listado-presentismo"
            element={
              <PrivateRoute>
                <Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/empleados"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="/crear-empleado"
            element={
              <PrivateRoute>
                <CreateEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar-empleado/:id"
            element={
              <PrivateRoute>
                <EditEmployee />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
