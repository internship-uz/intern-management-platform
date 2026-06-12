import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Intern } from "@/features/interns";
import type { IssueType, TaskPriority, TaskStatus } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";

export type GroupBy = "status" | "assignee" | "priority" | "type";
export type FilterValue<T> = T | "all";

export interface BoardFiltersProps {
  members: Intern[];
  activeAssignee: string | null;
  onAssigneeToggle: (id: string) => void;
  statusFilter: FilterValue<TaskStatus>;
  onStatusChange: (v: FilterValue<TaskStatus>) => void;
  typeFilter: FilterValue<IssueType>;
  onTypeChange: (v: FilterValue<IssueType>) => void;
  priorityFilter: FilterValue<TaskPriority>;
  onPriorityChange: (v: FilterValue<TaskPriority>) => void;
  groupBy: GroupBy;
  onGroupByChange: (v: GroupBy) => void;
  activeCount: number;
  onClear: () => void;
}

export function BoardFilters({
  members,
  activeAssignee,
  onAssigneeToggle,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  priorityFilter,
  onPriorityChange,
  groupBy,
  onGroupByChange,
  activeCount,
  onClear,
}: BoardFiltersProps) {
  const { t } = useTranslation();
  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='flex items-center -space-x-2'>
          {members.map((m) => {
            const active = activeAssignee === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onAssigneeToggle(m.id)}
                title={m.name}
                className={cn(
                  "relative rounded-full ring-2 ring-background transition-transform hover:z-10 hover:-translate-y-0.5",
                  active && "z-10 ring-primary"
                )}
              >
                <Avatar size='sm'>
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
            );
          })}
        </div>

        <FilterField label={t("task.status")}>
          <Select
            value={statusFilter}
            onValueChange={(v) => onStatusChange(v as FilterValue<TaskStatus>)}
          >
            <SelectTrigger size='sm' className='min-w-30'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value='all'>{t("board.allStatuses")}</SelectItem>
              <SelectItem value='todo'>{t("task.todo")}</SelectItem>
              <SelectItem value='in_progress'>
                {t("task.in_progress")}
              </SelectItem>
              <SelectItem value='done'>{t("task.done")}</SelectItem>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label={t("board.type")}>
          <Select
            value={typeFilter}
            onValueChange={(v) => onTypeChange(v as FilterValue<IssueType>)}
          >
            <SelectTrigger size='sm' className='min-w-30'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value='all'>{t("board.allTypes")}</SelectItem>
              <SelectItem value='story'>{t("type.story")}</SelectItem>
              <SelectItem value='task'>{t("type.task")}</SelectItem>
              <SelectItem value='bug'>{t("type.bug")}</SelectItem>
              <SelectItem value='epic'>{t("type.epic")}</SelectItem>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label={t("task.priority")}>
          <Select
            value={priorityFilter}
            onValueChange={(v) =>
              onPriorityChange(v as FilterValue<TaskPriority>)
            }
          >
            <SelectTrigger size='sm' className='min-w-35'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value='all'>{t("board.allPriorities")}</SelectItem>
              <SelectItem value='highest'>{t("priority.highest")}</SelectItem>
              <SelectItem value='high'>{t("priority.high")}</SelectItem>
              <SelectItem value='medium'>{t("priority.medium")}</SelectItem>
              <SelectItem value='low'>{t("priority.low")}</SelectItem>
              <SelectItem value='lowest'>{t("priority.lowest")}</SelectItem>
            </SelectContent>
          </Select>
        </FilterField>

        {activeCount > 0 && (
          <Button
            variant='ghost'
            size='xs'
            className='self-end'
            onClick={onClear}
          >
            <XIcon data-icon='inline-start' />
            {t("board.clear")} ({activeCount})
          </Button>
        )}
      </div>

      <FilterField label={t("board.groupBy")}>
        <Select
          value={groupBy}
          onValueChange={(v) => onGroupByChange(v as GroupBy)}
        >
          <SelectTrigger size='sm' className='min-w-30'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value='status'>{t("task.status")}</SelectItem>
            <SelectItem value='assignee'>{t("board.assignee")}</SelectItem>
            <SelectItem value='priority'>{t("task.priority")}</SelectItem>
            <SelectItem value='type'>{t("board.type")}</SelectItem>
          </SelectContent>
        </Select>
      </FilterField>
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-[10px] font-medium tracking-wide text-muted-foreground uppercase'>
        {label}
      </span>
      {children}
    </div>
  );
}
