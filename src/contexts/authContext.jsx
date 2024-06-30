import React, { createContext, useState, useEffect } from "react";
import userService from "../api/user";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getAuthenticatedUser();
        setIsAuthenticated(true);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };