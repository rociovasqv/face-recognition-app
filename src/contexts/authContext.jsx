import React, { createContext, useState, useEffect } from "react";
import userService from "../api/user";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getAuthenticatedUser();
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };