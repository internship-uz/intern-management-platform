import { cn } from "@/lib/utils";

export interface DonutSegment {
  key: string;
  count: number;
  color: string;
}

export interface DonutChartProps {
  total: number;
  centerLabel: string;
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
}

export function DonutChart({
  total,
  centerLabel,
  segments,
  size = 160,
  thickness = 22,
}: DonutChartProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeTotal = total || 1;

  const arcs = segments.reduce<
    { key: string; color: string; length: number; offset: number }[]
  >((acc, seg) => {
    if (seg.count === 0) return acc;
    const length = (seg.count / safeTotal) * circumference;
    const offset = acc.reduce((sum, a) => sum + a.length, 0);
    acc.push({ key: seg.key, color: seg.color, length, offset });
    return acc;
  }, []);

  return (
    <div className='relative shrink-0' style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className='-rotate-90'
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          strokeWidth={thickness}
          className='text-muted'
          stroke='currentColor'
        />
        {arcs.map((arc) => (
          <circle
            key={arc.key}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='none'
            strokeWidth={thickness}
            strokeDasharray={`${arc.length} ${circumference - arc.length}`}
            strokeDashoffset={-arc.offset}
            stroke='currentColor'
            className={cn("transition-all", arc.color)}
          />
        ))}
      </svg>
      <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
        <span className='text-3xl font-semibold tracking-tight'>{total}</span>
        <span className='text-[11px] text-muted-foreground'>
          {centerLabel}
        </span>
      </div>
    </div>
  );
}
