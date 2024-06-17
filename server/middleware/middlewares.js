import { Roles } from "../utils/constants.js";
import { verifyJwt } from "../utils/functions.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(403).json({ message: "You need to log in to access" });

  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

export const authorize = (roles = [Roles.MANAGER, Roles.SUPERVISOR, Roles.HR]) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. You do not have permission to access this resource." });
    }
    next();
  };
};