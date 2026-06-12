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

        <FilterField label='Status'>
          <Select
            value={statusFilter}
            onValueChange={(v) => onStatusChange(v as FilterValue<TaskStatus>)}
          >
            <SelectTrigger size='sm' className='min-w-30'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value='todo'>To do</SelectItem>
              <SelectItem value='in_progress'>In progress</SelectItem>
              <SelectItem value='done'>Done</SelectItem>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label='Type'>
          <Select
            value={typeFilter}
            onValueChange={(v) => onTypeChange(v as FilterValue<IssueType>)}
          >
            <SelectTrigger size='sm' className='min-w-30'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value='all'>All types</SelectItem>
              <SelectItem value='story'>Story</SelectItem>
              <SelectItem value='task'>Task</SelectItem>
              <SelectItem value='bug'>Bug</SelectItem>
              <SelectItem value='epic'>Epic</SelectItem>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label='Priority'>
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
              <SelectItem value='all'>All priorities</SelectItem>
              <SelectItem value='highest'>Highest</SelectItem>
              <SelectItem value='high'>High</SelectItem>
              <SelectItem value='medium'>Medium</SelectItem>
              <SelectItem value='low'>Low</SelectItem>
              <SelectItem value='lowest'>Lowest</SelectItem>
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
            Clear ({activeCount})
          </Button>
        )}
      </div>

      <FilterField label='Group by'>
        <Select
          value={groupBy}
          onValueChange={(v) => onGroupByChange(v as GroupBy)}
        >
          <SelectTrigger size='sm' className='min-w-30'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value='status'>Status</SelectItem>
            <SelectItem value='assignee'>Assignee</SelectItem>
            <SelectItem value='priority'>Priority</SelectItem>
            <SelectItem value='type'>Type</SelectItem>
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
