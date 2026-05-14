import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Outlet />
    </div>
  );
}
