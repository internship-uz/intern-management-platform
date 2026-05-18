import { cn } from "@/lib/utils";

export interface LegendSegment {
  key: string;
  label: string;
  count: number;
  dot: string;
}

export interface LegendProps {
  segments: LegendSegment[];
  total: number;
}

export function Legend({ segments, total }: LegendProps) {
  return (
    <ul className='flex min-w-40 flex-1 flex-col gap-2'>
      {segments
        .filter((s) => s.count > 0)
        .map((seg) => (
          <li key={seg.key} className='flex items-center gap-2 text-xs'>
            <span className={cn("size-2 rounded-full", seg.dot)} />
            <span>{seg.label}:</span>
            <span className='font-semibold'>{seg.count}</span>
            <span className='text-muted-foreground'>
              ({total ? Math.round((seg.count / total) * 100) : 0}%)
            </span>
          </li>
        ))}
    </ul>
  );
}
