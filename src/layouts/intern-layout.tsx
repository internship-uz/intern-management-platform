import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { getCurrentUser, useAuth } from "@/features/auth";
import { LogOutIcon } from "lucide-react";
import { useTranslation } from "@/i18n";
import { NavLink, Navigate, Outlet } from "react-router-dom";

export function InternLayout() {
  const user = getCurrentUser();
  const { logout } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (user.role !== "intern") {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { to: "/intern", label: t("nav.dashboard"), end: true },
    { to: "/intern/tasks", label: t("intern.myTasks"), end: false },
    { to: "/intern/profile", label: t("intern.profile"), end: false },
  ];

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between gap-4 border-b px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="font-semibold">{t("intern.portalTitle")}</span>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOutIcon className="size-4" />
            {t("common.logout")}
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4">
        <Outlet />
      </main>
    </div>
  );
}
