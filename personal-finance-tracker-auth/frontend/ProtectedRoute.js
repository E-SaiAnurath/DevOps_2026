import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, clearAuth } from "../auth";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }
  return children;
}