import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const appToken = sessionStorage.getItem("access_token");

  return appToken
    ? <Outlet />
    : <Navigate to="/login" replace />
};