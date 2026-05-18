import { cn } from "@/lib/utils";
import type { Intern } from "@/features/interns";
import type {
  IssueType,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/features/tasks";
import { useSearchStore } from "@/store/search-store";
import { useState } from "react";
import { priorityMeta, statusMeta } from "../issue-meta";
import {
  BoardFilters,
  type FilterValue,
  type GroupBy,
} from "./board-filters";
import { IssueCard } from "./issue-card";

interface ColumnDef {
  key: string;
  title: string;
}

function getColumns(
  groupBy: GroupBy,
  interns: Intern[],
  tasks: Task[]
): ColumnDef[] {
  if (groupBy === "status") {
    return [
      { key: "todo", title: "TO DO" },
      { key: "in_progress", title: "IN PROGRESS" },
      { key: "done", title: "DONE" },
    ];
  }
  if (groupBy === "priority") {
    return (
      ["highest", "high", "medium", "low", "lowest"] as TaskPriority[]
    ).map((p) => ({ key: p, title: priorityMeta[p].label.toUpperCase() }));
  }
  if (groupBy === "type") {
    return (["story", "task", "bug", "epic"] as IssueType[]).map((t) => ({
      key: t,
      title: t.toUpperCase(),
    }));
  }
  const assignedIds = new Set(tasks.map((t) => t.assigneeId));
  return interns
    .filter((i) => assignedIds.has(i.id))
    .map((i) => ({ key: i.id, title: i.name.toUpperCase() }));
}

function getGroupKey(task: Task, groupBy: GroupBy): string {
  if (groupBy === "status") return task.status;
  if (groupBy === "assignee") return task.assigneeId;
  if (groupBy === "priority") return task.priority;
  return task.type;
}

function applyGroupChange(task: Task, groupBy: GroupBy, value: string): Task {
  if (groupBy === "status") return { ...task, status: value as TaskStatus };
  if (groupBy === "assignee") return { ...task, assigneeId: value };
  if (groupBy === "priority")
    return { ...task, priority: value as TaskPriority };
  return { ...task, type: value as IssueType };
}

interface DragState {
  taskId: string;
}

export interface TaskBoardProps {
  tasks: Task[];
  onTasksChange: (next: Task[]) => void;
  interns: Intern[];
}

export function TaskBoard({
  tasks,
  onTasksChange,
  interns,
}: TaskBoardProps) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);
  const [overTaskId, setOverTaskId] = useState<string | null>(null);

  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const [activeAssignee, setActiveAssignee] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<FilterValue<IssueType>>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<FilterValue<TaskPriority>>("all");
  const [groupBy, setGroupBy] = useState<GroupBy>("status");

  const internMap = new Map(interns.map((i) => [i.id, i]));
  const boardMembers = interns.slice(0, 5);

  const filtered = tasks.filter((t) => {
    if (
      query &&
      !t.title.toLowerCase().includes(query.toLowerCase()) &&
      !t.key.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    if (activeAssignee && t.assigneeId !== activeAssignee) return false;
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter)
      return false;
    return true;
  });

  const columns = getColumns(groupBy, interns, tasks);
  const activeFiltersCount =
    (typeFilter !== "all" ? 1 : 0) +
    (priorityFilter !== "all" ? 1 : 0) +
    (activeAssignee ? 1 : 0) +
    (query ? 1 : 0);

  function clearFilters() {
    setQuery("");
    setActiveAssignee(null);
    setTypeFilter("all");
    setPriorityFilter("all");
  }

  function handleDragEnd() {
    setDrag(null);
    setOverColumn(null);
    setOverTaskId(null);
  }

  function moveTask(
    taskId: string,
    targetColumnKey: string,
    targetTaskId: string | null
  ) {
    const moving = tasks.find((t) => t.id === taskId);
    if (!moving) return;
    const without = tasks.filter((t) => t.id !== taskId);
    const updated = applyGroupChange(moving, groupBy, targetColumnKey);

    if (!targetTaskId) {
      onTasksChange([...without, updated]);
      return;
    }
    const targetIndex = without.findIndex((t) => t.id === targetTaskId);
    if (targetIndex === -1) {
      onTasksChange([...without, updated]);
      return;
    }
    const next = [...without];
    next.splice(targetIndex, 0, updated);
    onTasksChange(next);
  }

  return (
    <section className='flex flex-col gap-3'>
      <BoardFilters
        members={boardMembers}
        activeAssignee={activeAssignee}
        onAssigneeToggle={(id) =>
          setActiveAssignee((cur) => (cur === id ? null : id))
        }
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        activeCount={activeFiltersCount}
        onClear={clearFilters}
      />

      <div
        className={cn(
          "grid grid-cols-1 gap-3",
          columns.length === 3 && "md:grid-cols-3",
          columns.length === 4 && "md:grid-cols-2 xl:grid-cols-4",
          columns.length >= 5 && "md:grid-cols-3 xl:grid-cols-5"
        )}
      >
        {columns.length === 0 && (
          <div className='rounded-md border border-dashed border-border/50 p-8 text-center text-xs text-muted-foreground'>
            Bu guruh bo‘yicha hech narsa yo‘q
          </div>
        )}
        {columns.map((col) => {
          const items = filtered.filter(
            (t) => getGroupKey(t, groupBy) === col.key
          );
          const isOver = overColumn === col.key && drag !== null;

          return (
            <div
              key={col.key}
              onDragOver={(e) => {
                e.preventDefault();
                if (overColumn !== col.key) setOverColumn(col.key);
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                setOverColumn((cur) => (cur === col.key ? null : cur));
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (!drag) return;
                moveTask(drag.taskId, col.key, overTaskId);
                handleDragEnd();
              }}
              className={cn(
                "flex flex-col rounded-md bg-muted/60 transition-colors dark:bg-muted/30",
                isOver && "bg-primary/5 ring-1 ring-primary/30"
              )}
            >
              <div className='flex items-center justify-between px-3 pt-3 pb-2'>
                <div className='flex items-center gap-2'>
                  {groupBy === "status" && (
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        statusMeta[col.key as TaskStatus].dot
                      )}
                    />
                  )}
                  <span className='text-[11px] font-semibold tracking-wider text-muted-foreground'>
                    {col.title}
                  </span>
                  <span className='text-[11px] text-muted-foreground'>
                    {items.length}
                  </span>
                </div>
              </div>

              <div className='flex flex-1 flex-col gap-2 px-2 pb-2'>
                {items.length === 0 ? (
                  <div
                    className={cn(
                      "rounded-sm border border-dashed border-border/50 px-3 py-6 text-center text-xs text-muted-foreground",
                      isOver && "border-primary/40 text-primary"
                    )}
                  >
                    {isOver ? "Bu yerga tashlang" : "Issuelar yo‘q"}
                  </div>
                ) : (
                  items.map((task) => (
                    <IssueCard
                      key={task.id}
                      task={task}
                      assignee={internMap.get(task.assigneeId)}
                      isDragging={drag?.taskId === task.id}
                      isOver={
                        overTaskId === task.id && drag?.taskId !== task.id
                      }
                      onDragStart={() => setDrag({ taskId: task.id })}
                      onDragEnd={handleDragEnd}
                      onDragOver={() => {
                        if (overTaskId !== task.id) setOverTaskId(task.id);
                        if (overColumn !== col.key) setOverColumn(col.key);
                      }}
                      onDragLeave={(e) => {
                        if (e.currentTarget.contains(e.relatedTarget as Node))
                          return;
                        setOverTaskId((cur) =>
                          cur === task.id ? null : cur
                        );
                      }}
                      onDrop={() => {
                        if (!drag) return;
                        moveTask(drag.taskId, col.key, task.id);
                        handleDragEnd();
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
