import type { IssueType, TaskPriority, TaskStatus } from "@/features/tasks";
import {
  BookmarkIcon,
  BugIcon,
  CheckSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EqualIcon,
  ZapIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const issueTypeMeta: Record<
  IssueType,
  { icon: LucideIcon; bg: string; label: string }
> = {
  story: { icon: BookmarkIcon, bg: "bg-emerald-500", label: "Story" },
  task: { icon: CheckSquareIcon, bg: "bg-sky-500", label: "Task" },
  bug: { icon: BugIcon, bg: "bg-rose-500", label: "Bug" },
  epic: { icon: ZapIcon, bg: "bg-violet-500", label: "Epic" },
};

export const priorityMeta: Record<
  TaskPriority,
  { icon: LucideIcon; color: string; label: string }
> = {
  highest: {
    icon: ChevronUpIcon,
    color: "text-rose-600 dark:text-rose-400",
    label: "Highest",
  },
  high: {
    icon: ChevronUpIcon,
    color: "text-orange-500 dark:text-orange-400",
    label: "High",
  },
  medium: {
    icon: EqualIcon,
    color: "text-amber-500 dark:text-amber-400",
    label: "Medium",
  },
  low: {
    icon: ChevronDownIcon,
    color: "text-sky-500 dark:text-sky-400",
    label: "Low",
  },
  lowest: {
    icon: ChevronDownIcon,
    color: "text-slate-400",
    label: "Lowest",
  },
};

export const statusMeta: Record<
  TaskStatus,
  { label: string; pill: string; dot: string }
> = {
  todo: {
    label: "To do",
    pill: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  in_progress: {
    label: "In progress",
    pill: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  done: {
    label: "Done",
    pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
};
