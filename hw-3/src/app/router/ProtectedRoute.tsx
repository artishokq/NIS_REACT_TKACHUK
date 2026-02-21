import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated, selectIsInitialized } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { Loader } from "@/shared/ui";

export function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);

  if (!isInitialized) {
    return <Loader fullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
