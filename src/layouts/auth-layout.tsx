import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout() {
  const isAuth = !!localStorage.getItem("user");

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6 bg-muted/20">
      <Outlet />
    </div>
  );
}
