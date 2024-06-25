import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"; 
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Attendance from "./pages/Attendance";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/createEmployeeForm";
import EditEmployee from "./pages/EditEmployeeForm";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./contexts/authContext";
import Attendance from "./pages/Attendance";

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presentismo" element={<Attendance />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" component={Card} /> */}
          {/* <Route path="/table" element={<Table records={records} />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
