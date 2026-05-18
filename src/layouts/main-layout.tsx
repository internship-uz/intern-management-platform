import { Header } from "@/components/header";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
