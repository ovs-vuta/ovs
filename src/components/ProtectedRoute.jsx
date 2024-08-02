import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  //  const { userDetails, error, isLoading, token } = useFetchUserInfo();
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
