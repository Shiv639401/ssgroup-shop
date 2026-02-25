import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const { accessToken, role } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle both ADMIN and ROLE_ADMIN
  if (role !== "ROLE_ADMIN" && role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}