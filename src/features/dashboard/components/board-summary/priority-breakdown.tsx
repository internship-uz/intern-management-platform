import type { Task, TaskPriority } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { priorityMeta } from "../issue-meta";
import { Panel } from "./panel";

export interface PriorityBreakdownProps {
  tasks: Task[];
}

export function PriorityBreakdown({ tasks }: PriorityBreakdownProps) {
  const priorities: (TaskPriority | "none")[] = [
    "highest",
    "high",
    "medium",
    "low",
    "lowest",
    "none",
  ];
  const counts = priorities.map((p) =>
    p === "none" ? 0 : tasks.filter((t) => t.priority === p).length
  );
  const maxCount = Math.max(...counts, 1);
  const ticks = Math.max(maxCount, 3);

  return (
    <Panel
      title='Priority breakdown'
      hint='Get a holistic view of how work is being prioritized.'
      link={{ label: "How to manage priorities" }}
    >
      <div className='flex h-55 gap-3'>
        <div className='flex flex-col-reverse justify-between py-2 text-[11px] text-muted-foreground tabular-nums'>
          {Array.from({ length: ticks + 1 }).map((_, i) => (
            <span key={i} className='leading-none'>
              {i}
            </span>
          ))}
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='relative flex flex-1 items-end gap-2 border-l border-b border-border/60 pl-2'>
            <div className='absolute inset-0 flex flex-col-reverse justify-between py-2'>
              {Array.from({ length: ticks + 1 }).map((_, i) => (
                <div
                  key={i}
                  className='h-px w-full bg-border/40'
                  style={{ display: i === 0 ? "none" : "block" }}
                />
              ))}
            </div>
            {priorities.map((p, idx) => {
              const count = counts[idx];
              const heightPercent = (count / ticks) * 100;
              const meta = p === "none" ? null : priorityMeta[p];
              return (
                <div
                  key={p}
                  className='relative flex flex-1 flex-col items-center justify-end'
                >
                  <div
                    className={cn(
                      "w-full max-w-10 rounded-t-sm transition-all",
                      meta
                        ? cn("bg-current opacity-70", meta.color)
                        : "bg-muted-foreground/30"
                    )}
                    style={{ height: `${heightPercent}%` }}
                    title={`${count}`}
                  />
                </div>
              );
            })}
          </div>
          <div className='mt-2 flex items-center gap-2 pl-2 text-[11px] text-muted-foreground'>
            {priorities.map((p) => {
              const meta = p === "none" ? null : priorityMeta[p];
              const Icon = meta?.icon;
              return (
                <div
                  key={p}
                  className='flex flex-1 items-center justify-center gap-1'
                >
                  {Icon && <Icon className={cn("size-3", meta!.color)} />}
                  <span className='truncate capitalize'>
                    {p === "none" ? "None" : meta?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}
