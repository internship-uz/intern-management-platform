import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskStatus } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import { statusMeta } from "../issue-meta";

export interface StatusPillProps {
  status: TaskStatus;
  onChange: (s: TaskStatus) => void;
}

export function StatusPill({ status, onChange }: StatusPillProps) {
  const { t } = useTranslation();
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
        <SelectItem value='todo'>{t("task.todo")}</SelectItem>
        <SelectItem value='in_progress'>{t("task.in_progress")}</SelectItem>
        <SelectItem value='done'>{t("task.done")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
