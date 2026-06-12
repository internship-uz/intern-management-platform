import { getCurrentUser, getHomePathForRole } from "@/features/auth";
import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout() {
  const user = getCurrentUser();

  if (user) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6 bg-muted/20">
      <Outlet />
    </div>
  );
}
