import type { Task } from "@/features/tasks";
import {
  CalendarClockIcon,
  CheckCircle2Icon,
  PlusCircleIcon,
  RefreshCcwIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const DAY_MS = 1000 * 60 * 60 * 24;

export interface TopStatsProps {
  tasks: Task[];
}

export function TopStats({ tasks }: TopStatsProps) {
  const [now] = useState(() => Date.now());
  const last7 = now - 7 * DAY_MS;
  const next7 = now + 7 * DAY_MS;

  const completed = tasks.filter((t) => t.status === "done").length;
  const updated = tasks.filter(
    (t) => new Date(t.createdAt).getTime() >= last7
  ).length;
  const created = tasks.filter(
    (t) => new Date(t.createdAt).getTime() >= last7
  ).length;
  const dueSoon = tasks.filter((t) => {
    if (!t.dueDate || t.status === "done") return false;
    const due = new Date(t.dueDate).getTime();
    return due >= now && due <= next7;
  }).length;

  const items: {
    icon: LucideIcon;
    value: number;
    label: string;
    hint: string;
  }[] = [
    {
      icon: CheckCircle2Icon,
      value: completed,
      label: "completed",
      hint: "in the last 7 days",
    },
    {
      icon: RefreshCcwIcon,
      value: updated,
      label: "updated",
      hint: "in the last 7 days",
    },
    {
      icon: PlusCircleIcon,
      value: created,
      label: "created",
      hint: "in the last 7 days",
    },
    {
      icon: CalendarClockIcon,
      value: dueSoon,
      label: "due soon",
      hint: "in the next 7 days",
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className='flex items-center gap-3 rounded-md border border-border/60 bg-card px-4 py-3'
          >
            <span className='flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground'>
              <Icon className='size-4' />
            </span>
            <div className='flex flex-col leading-tight'>
              <span className='text-sm font-medium'>
                <span className='font-semibold'>{it.value}</span> {it.label}
              </span>
              <span className='text-[11px] text-muted-foreground'>
                {it.hint}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
