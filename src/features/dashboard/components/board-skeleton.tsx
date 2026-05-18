import { Skeleton } from "@/components/ui/skeleton";

export function BoardSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <Skeleton className='size-7 rounded-full' />
          <Skeleton className='size-7 rounded-full' />
          <Skeleton className='size-7 rounded-full' />
          <Skeleton className='h-8 w-28 rounded-md' />
          <Skeleton className='h-8 w-32 rounded-md' />
        </div>
        <Skeleton className='h-8 w-32 rounded-md' />
      </div>

      <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, colIdx) => (
          <div
            key={colIdx}
            className='flex flex-col gap-2 rounded-md bg-muted/60 p-2 dark:bg-muted/30'
          >
            <div className='flex items-center gap-2 px-1.5 py-1'>
              <Skeleton className='h-3 w-20' />
              <Skeleton className='h-3 w-4' />
            </div>
            {Array.from({ length: 2 + colIdx }).map((_, cardIdx) => (
              <IssueCardSkeleton key={cardIdx} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueCardSkeleton() {
  return (
    <div className='flex flex-col gap-3 rounded-sm border border-border/60 bg-background p-2.5'>
      <Skeleton className='h-4 w-11/12' />
      <Skeleton className='h-4 w-3/5' />
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5'>
          <Skeleton className='size-4 rounded-sm' />
          <Skeleton className='h-3 w-10' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='size-4 rounded-full' />
          <Skeleton className='size-5 rounded-full' />
          <Skeleton className='size-5 rounded-full' />
        </div>
      </div>
    </div>
  );
}
