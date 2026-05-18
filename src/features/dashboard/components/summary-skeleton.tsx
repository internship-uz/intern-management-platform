import { Skeleton } from "@/components/ui/skeleton";

export function SummarySkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <PanelSkeleton variant='bars' />
      <PanelSkeleton variant='table' />
    </div>
  );
}

function PanelSkeleton({ variant }: { variant: "table" | "bars" }) {
  return (
    <section className='flex flex-col rounded-md border border-border/60 bg-card'>
      <header className='flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='size-4 rounded-sm' />
      </header>
      <div className='flex-1 p-4'>
        {variant === "bars" && (
          <div className='flex h-48 items-end gap-3'>
            {[40, 70, 55, 30, 60].map((h, i) => (
              <Skeleton
                key={i}
                className='w-full rounded-t-sm'
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}
        {variant === "table" && (
          <div className='flex flex-col gap-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex items-center gap-3'>
                <Skeleton className='size-5 rounded-full' />
                <Skeleton className='h-3 w-1/3' />
                <Skeleton className='ml-auto h-2 max-w-40 flex-1 rounded-full' />
                <Skeleton className='h-3 w-10' />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
