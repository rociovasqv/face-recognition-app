import jwt from "jsonwebtoken";
import { VITE_SECRET_KEY } from "../config";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json("You need to log in to access");

  jwt.verify(token, VITE_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("Failed to authenticate token");
    }

    req.user = decoded;
    next();
  });
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json("Access denied. You do not have permission to access this resource.");
    }
    next();
  };
};