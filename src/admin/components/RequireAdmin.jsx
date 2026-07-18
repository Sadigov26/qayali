import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminToken } from "../api/adminApi";

export default function RequireAdmin() {
  const location = useLocation();

  if (!getAdminToken()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
