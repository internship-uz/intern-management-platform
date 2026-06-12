import type { Task, TaskPriority } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import { priorityMeta } from "../issue-meta";
import { Panel } from "./panel";

const priorityBarBg: Record<TaskPriority, string> = {
  highest: "bg-rose-500",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-sky-500",
  lowest: "bg-slate-400",
};

export interface PriorityBreakdownProps {
  tasks: Task[];
}

export function PriorityBreakdown({ tasks }: PriorityBreakdownProps) {
  const { t } = useTranslation();
  const priorities: TaskPriority[] = [
    "highest",
    "high",
    "medium",
    "low",
    "lowest",
  ];
  const counts = priorities.map(
    (p) => tasks.filter((t) => t.priority === p).length
  );
  const maxCount = Math.max(...counts, 1);
  const ticks = Math.max(maxCount, 3);
  const tickLabels = Array.from({ length: ticks + 1 }).map((_, i) => i);

  return (
    <Panel title={t("board.priorityBreakdown")}>
      <div className='flex h-56 gap-2'>
        <div className='flex flex-col-reverse justify-between py-1 pr-1 text-[11px] text-muted-foreground tabular-nums'>
          {tickLabels.map((label) => (
            <span key={label} className='leading-none'>
              {label}
            </span>
          ))}
        </div>

        <div className='flex flex-1 flex-col gap-2'>
          <div className='relative flex flex-1 items-end gap-3 border-l border-b border-border/60 pl-2'>
            <div className='pointer-events-none absolute inset-0 flex flex-col-reverse justify-between py-1'>
              {tickLabels.map((i) =>
                i === 0 ? null : (
                  <div key={i} className='h-px w-full bg-border/40' />
                )
              )}
            </div>

            {priorities.map((p, idx) => {
              const count = counts[idx];
              const heightPercent = (count / ticks) * 100;
              return (
                <div
                  key={p}
                  className='relative z-10 flex h-full flex-1 flex-col items-center justify-end'
                  title={`${t(`priority.${p}`)}: ${count}`}
                >
                  {count > 0 && (
                    <span className='mb-1 text-[10px] font-semibold tabular-nums text-muted-foreground'>
                      {count}
                    </span>
                  )}
                  <div
                    className={cn(
                      "w-full max-w-10 rounded-t-sm transition-all duration-300",
                      count > 0 ? priorityBarBg[p] : "bg-muted"
                    )}
                    style={{ height: count > 0 ? `${heightPercent}%` : "4px" }}
                  />
                </div>
              );
            })}
          </div>

          <div className='flex items-center gap-3 pl-2 text-[11px] text-muted-foreground'>
            {priorities.map((p) => {
              const meta = priorityMeta[p];
              const Icon = meta.icon;
              return (
                <div
                  key={p}
                  className='flex flex-1 items-center justify-center gap-1'
                >
                  <Icon className={cn("size-3", meta.color)} />
                  <span className='truncate'>{t(`priority.${p}`)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}
