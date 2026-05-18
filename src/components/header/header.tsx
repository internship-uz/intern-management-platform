import { ModeToggle } from "@/components/shared/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderSearch } from "./header-search";

export function Header() {
  return (
    <header className='flex h-14 shrink-0 items-center gap-3 border-b border-border/60 px-4'>
      <SidebarTrigger className='-ml-1' />
      <HeaderSearch />
      <div className='ml-auto'>
        <ModeToggle />
      </div>
    </header>
  );
}
