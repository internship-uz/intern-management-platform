import { useSearchStore } from "@/store/search-store";
import { SearchIcon } from "lucide-react";

export function HeaderSearch() {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  return (
    <div className='relative w-full max-w-md'>
      <SearchIcon className='pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground' />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search…'
        className='h-8 w-full rounded-md border border-border/60 bg-background pr-3 pl-8 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'
      />
    </div>
  );
}
