import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskStatus } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { statusMeta } from "../issue-meta";

export interface StatusPillProps {
  status: TaskStatus;
  onChange: (s: TaskStatus) => void;
}

export function StatusPill({ status, onChange }: StatusPillProps) {
  const meta = statusMeta[status];
  return (
    <Select value={status} onValueChange={(v) => onChange(v as TaskStatus)}>
      <SelectTrigger
        size='sm'
        className={cn(
          "h-6 border-0 px-2 text-[10px] font-semibold tracking-wide uppercase",
          meta.pill
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectItem value='todo'>To do</SelectItem>
        <SelectItem value='in_progress'>In progress</SelectItem>
        <SelectItem value='done'>Done</SelectItem>
      </SelectContent>
    </Select>
  );
}
