import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const token = useSelector((s: RootState) => s.auth.token);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
