import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import React from "react";

const PrivateRoute = () => {

  const { token } = useAuthStore();

  return token ? <Outlet /> : <Navigate to="/login" replace />;

};

export default PrivateRoute;
