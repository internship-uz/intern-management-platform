import { AppSidebar } from "@/components/shared/app-sidebar";
import { ModeToggle } from "@/components/shared/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-14 shrink-0 items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <ModeToggle />
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
