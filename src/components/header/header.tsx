import { ModeToggle } from "@/components/shared/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderSearch } from "./header-search";
import { NotificationsButton } from "./notifications-button";

export function Header() {
  return (
    <header className='sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 px-4 backdrop-blur'>
      <SidebarTrigger className='-ml-1' />
      <HeaderSearch />
      <div className='ml-auto flex items-center gap-1'>
        <NotificationsButton />
        <ModeToggle />
      </div>
    </header>
  );
}
