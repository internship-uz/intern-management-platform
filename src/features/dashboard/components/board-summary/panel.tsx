import { ExternalLinkIcon } from "lucide-react";

export interface PanelProps {
  title: string;
  hint?: string;
  link?: { label: string; href?: string };
  children: React.ReactNode;
}

export function Panel({ title, hint, link, children }: PanelProps) {
  return (
    <section className='flex flex-col rounded-md border border-border/60 bg-card'>
      <header className='flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3'>
        <div className='flex min-w-0 flex-col'>
          <h2 className='text-sm font-semibold tracking-tight'>{title}</h2>
          {hint && (
            <p className='mt-0.5 text-[11px] text-muted-foreground'>
              {hint}
              {link && (
                <>
                  {" "}
                  <button className='font-medium text-primary hover:underline'>
                    {link.label}
                  </button>
                </>
              )}
            </p>
          )}
        </div>
        <button className='shrink-0 text-muted-foreground hover:text-foreground'>
          <ExternalLinkIcon className='size-3.5' />
        </button>
      </header>
      <div className='flex-1 p-4'>{children}</div>
    </section>
  );
}
