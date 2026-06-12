import { NotificationsButton } from "@/components/header/notifications-button";
import { InternSidebar } from "@/components/shared/intern-sidebar";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ModeToggle } from "@/components/shared/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/features/auth";
import { useTranslation } from "@/i18n";
import { Navigate, Outlet } from "react-router-dom";

export function InternLayout() {
  const user = getCurrentUser();
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (user.role !== "intern") {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
    >
      <InternSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <span className="font-semibold">{t("intern.portalTitle")}</span>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <NotificationsButton />
            <ModeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
