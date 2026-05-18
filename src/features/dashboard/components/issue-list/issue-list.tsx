import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import type { Intern } from "@/features/interns";
import type {
  Task,
  TaskPatch,
  TaskPriority,
  TaskStatus,
} from "@/features/tasks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { issueTypeMeta } from "../issue-meta";
import { EditFieldsDialog } from "./edit-fields-dialog";
import { PriorityPill } from "./priority-pill";
import { SelectionActionBar } from "./selection-action-bar";
import { SortableHeader } from "./sortable-header";
import { StatusPill } from "./status-pill";

type SortKey = "key" | "priority" | "points" | "due";

const priorityOrder = ["highest", "high", "medium", "low", "lowest"] as const;

function formatDate(date?: string) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

export interface IssueListProps {
  tasks: Task[];
  interns: Intern[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onPriorityChange: (taskId: string, priority: TaskPriority) => void;
  onUpdateTask?: (taskId: string, patch: TaskPatch) => void;
  onDelete?: (taskIds: string[]) => void;
}

export function IssueList({
  tasks,
  interns,
  onStatusChange,
  onPriorityChange,
  onUpdateTask,
  onDelete,
}: IssueListProps) {
  const internMap = new Map(interns.map((i) => [i.id, i]));
  const [sortKey, setSortKey] = useState<SortKey>("key");
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editOpen, setEditOpen] = useState(false);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  }

  function toggleSelected(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(tasks.map((t) => t.id)));
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function handleDelete() {
    onDelete?.(Array.from(selected));
    clearSelection();
  }

  function handleApplyEdit(patch: TaskPatch) {
    selected.forEach((id) => onUpdateTask?.(id, patch));
    clearSelection();
  }

  const allSelected =
    tasks.length > 0 && selected.size === tasks.length;
  const someSelected = selected.size > 0 && !allSelected;

  const sorted = [...tasks].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "key") cmp = a.key.localeCompare(b.key);
    else if (sortKey === "priority")
      cmp =
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    else if (sortKey === "points")
      cmp = (a.storyPoints ?? 0) - (b.storyPoints ?? 0);
    else if (sortKey === "due")
      cmp =
        (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) -
        (b.dueDate ? new Date(b.dueDate).getTime() : Infinity);
    return asc ? cmp : -cmp;
  });

  return (
    <div className='overflow-hidden rounded-md border border-border/60 bg-card'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='bg-muted/40 text-[11px] font-medium tracking-wide text-muted-foreground uppercase'>
            <tr>
              <th className='w-8 px-3 py-2 text-left'>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={(v) => {
                    if (v) selectAll();
                    else clearSelection();
                  }}
                  aria-label='Select all'
                />
              </th>
              <th className='w-8 px-3 py-2 text-left'>T</th>
              <SortableHeader
                label='Key'
                active={sortKey === "key"}
                asc={asc}
                onClick={() => toggleSort("key")}
              />
              <th className='px-3 py-2 text-left font-medium'>Summary</th>
              <th className='px-3 py-2 text-left font-medium'>Status</th>
              <SortableHeader
                label='Priority'
                active={sortKey === "priority"}
                asc={asc}
                onClick={() => toggleSort("priority")}
              />
              <th className='px-3 py-2 text-left font-medium'>Assignee</th>
              <SortableHeader
                label='Points'
                active={sortKey === "points"}
                asc={asc}
                onClick={() => toggleSort("points")}
                className='text-right'
              />
              <SortableHeader
                label='Due'
                active={sortKey === "due"}
                asc={asc}
                onClick={() => toggleSort("due")}
              />
            </tr>
          </thead>
          <tbody className='divide-y divide-border/60'>
            {sorted.map((task) => {
              const type = issueTypeMeta[task.type];
              const TypeIcon = type.icon;
              const assignee = internMap.get(task.assigneeId);
              const overdue =
                task.status !== "done" &&
                task.dueDate &&
                new Date(task.dueDate).getTime() < Date.now();

              const isSelected = selected.has(task.id);
              return (
                <tr
                  key={task.id}
                  data-selected={isSelected}
                  className='group transition-colors hover:bg-muted/40 data-[selected=true]:bg-primary/5'
                >
                  <td className='px-3 py-2'>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(v) =>
                        toggleSelected(task.id, v === true)
                      }
                      aria-label={`Select ${task.key}`}
                    />
                  </td>
                  <td className='px-3 py-2'>
                    <span
                      title={type.label}
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm text-white",
                        type.bg
                      )}
                    >
                      <TypeIcon className='size-2.5' />
                    </span>
                  </td>
                  <td className='px-3 py-2 font-medium text-muted-foreground'>
                    {task.key}
                  </td>
                  <td className='px-3 py-2 font-medium'>
                    <div className='flex items-center gap-2'>
                      <span className='line-clamp-1'>{task.title}</span>
                      {task.labels?.map((label) => (
                        <span
                          key={label}
                          className='rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase'
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className='px-3 py-2'>
                    <StatusPill
                      status={task.status}
                      onChange={(s) => onStatusChange(task.id, s)}
                    />
                  </td>
                  <td className='px-3 py-2'>
                    <PriorityPill
                      priority={task.priority}
                      onChange={(p) => onPriorityChange(task.id, p)}
                    />
                  </td>
                  <td className='px-3 py-2'>
                    {assignee ? (
                      <div className='flex items-center gap-2'>
                        <Avatar size='sm' className='size-5'>
                          <AvatarImage src={assignee.avatar} />
                          <AvatarFallback>
                            {assignee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className='truncate text-xs'>
                          {assignee.name}
                        </span>
                      </div>
                    ) : (
                      <span className='text-xs text-muted-foreground'>
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className='px-3 py-2 text-right'>
                    {task.storyPoints != null && (
                      <span className='inline-flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold'>
                        {task.storyPoints}
                      </span>
                    )}
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2 text-xs",
                      overdue
                        ? "font-medium text-rose-600 dark:text-rose-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatDate(task.dueDate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <SelectionActionBar
        selectedCount={selected.size}
        onSelectAll={selectAll}
        onEditFields={() => setEditOpen(true)}
        onDelete={handleDelete}
        onClear={clearSelection}
      />

      <EditFieldsDialog
        open={editOpen}
        tasks={tasks.filter((t) => selected.has(t.id))}
        interns={interns}
        onClose={() => setEditOpen(false)}
        onApply={handleApplyEdit}
      />
    </div>
  );
}
