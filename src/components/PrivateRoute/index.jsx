import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Importa Routes, Navigate desde react-router-dom
import { AuthContext } from "../../contexts/authContext";
import NotFound from "../../pages/NotFound";
import { Roles } from "../../data/constants";

export default function PrivateRoute({
  role = [Roles.MANAGER, Roles.SUPERVISOR, Roles.HR],
  component: Component,
  children,
  ...rest
}) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated && role && !role.includes(user.role)) {
    return <Navigate to="/not-found" state={{ isErrorRole: true }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}