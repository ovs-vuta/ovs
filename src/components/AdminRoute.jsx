import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../utils/auth";

const AdminRoute = ({ children }) => {
  return isLoggedIn() && getUserRole() === "admin" ? children : (<Navigate to="/login" />);
};

export default AdminRoute;
