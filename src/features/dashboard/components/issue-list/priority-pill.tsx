import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskPriority } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { priorityMeta } from "../issue-meta";

export interface PriorityPillProps {
  priority: TaskPriority;
  onChange: (p: TaskPriority) => void;
}

const priorities: TaskPriority[] = [
  "highest",
  "high",
  "medium",
  "low",
  "lowest",
];

export function PriorityPill({ priority, onChange }: PriorityPillProps) {
  const meta = priorityMeta[priority];
  const Icon = meta.icon;
  return (
    <Select
      value={priority}
      onValueChange={(v) => onChange(v as TaskPriority)}
    >
      <SelectTrigger size='sm' className='h-6 gap-1.5 border-0 px-1.5 text-xs'>
        <SelectValue>
          <Icon className={cn("size-3.5", meta.color)} />
          <span>{meta.label}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {priorities.map((p) => {
          const pm = priorityMeta[p];
          const PIcon = pm.icon;
          return (
            <SelectItem key={p} value={p}>
              <PIcon className={cn("size-3.5", pm.color)} />
              <span>{pm.label}</span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
