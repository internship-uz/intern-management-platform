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
import { useSearchStore } from "@/store/search-store";
import { useState } from "react";
import { issueTypeMeta } from "../issue-meta";
import { EditFieldsDialog } from "./edit-fields-dialog";
import { PriorityPill } from "./priority-pill";
import { SelectionActionBar } from "./selection-action-bar";
import { SortableHeader } from "./sortable-header";
import { StatusPill } from "./status-pill";

type SortKey = "priority";

const priorityOrder = ["highest", "high", "medium", "low", "lowest"] as const;

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
  const [sortKey, setSortKey] = useState<SortKey>("priority");
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
    setSelected(new Set(sorted.map((t) => t.id)));
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

  const query = useSearchStore((s) => s.query);
  const q = query.trim().toLowerCase();

  const filtered = q
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.key.toLowerCase().includes(q)
      )
    : tasks;

  const allSelected =
    filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;

  const sorted = [...filtered].sort((a, b) => {
    const cmp =
      priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
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
              <th className='w-10 px-3 py-2 text-left font-medium'>#</th>
              <th className='w-8 px-3 py-2 text-left'>T</th>
              <th className='px-3 py-2 text-left font-medium'>Title</th>
              <th className='px-3 py-2 text-left font-medium'>Status</th>
              <SortableHeader
                label='Priority'
                active={sortKey === "priority"}
                asc={asc}
                onClick={() => toggleSort("priority")}
              />
              <th className='px-3 py-2 text-left font-medium'>Assignee</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border/60'>
            {sorted.map((task, index) => {
              const type = issueTypeMeta[task.type];
              const TypeIcon = type.icon;
              const assignee = internMap.get(task.assigneeId);
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
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                  <td className='px-3 py-2 font-medium text-muted-foreground tabular-nums'>
                    {index + 1}
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
