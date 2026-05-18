import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className='overflow-hidden rounded-md border border-border/60 bg-card'>
      <div className='flex items-center gap-3 border-b border-border/60 bg-muted/40 px-3 py-2'>
        <Skeleton className='size-4 rounded-sm' />
        <Skeleton className='h-3 w-12' />
        <Skeleton className='ml-auto h-3 w-20' />
        <Skeleton className='h-3 w-16' />
        <Skeleton className='h-3 w-16' />
        <Skeleton className='h-3 w-20' />
      </div>

      <div className='divide-y divide-border/60'>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className='flex items-center gap-3 px-3 py-3'>
            <Skeleton className='size-4 rounded-sm' />
            <Skeleton className='size-4 rounded-sm' />
            <Skeleton className='h-3 w-12' />
            <Skeleton className='h-3 flex-1' />
            <Skeleton className='h-5 w-20 rounded-sm' />
            <Skeleton className='h-3 w-16' />
            <Skeleton className='size-5 rounded-full' />
            <Skeleton className='h-3 w-12' />
          </div>
        ))}
      </div>
    </div>
  );
}
