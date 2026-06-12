import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout as doLogout } from "../lib/auth";

export function useAuth() {
  const navigate = useNavigate();
  const user = useMemo(() => getCurrentUser(), []);

  const logout = useCallback(() => {
    doLogout();
    navigate("/auth/sign-in", { replace: true });
  }, [navigate]);

  return {
    user,
    role: user?.role ?? null,
    internId: user?.internId,
    isAuthenticated: user !== null,
    isAdmin: user?.role === "admin",
    isIntern: user?.role === "intern",
    logout,
  };
}
