import {
  BoardSummary,
  IssueList,
  ProjectHeader,
  TaskBoard,
  ViewTabs,
  type DashboardView,
} from "@/features/dashboard";
import { useInterns } from "@/features/interns";
import { useTasks, type TaskPriority, type TaskStatus } from "@/features/tasks";
import { useState } from "react";

export default function DashboardPage() {
  const { tasks, setTasks, updateTask, removeTasks, loading } = useTasks();
  const { interns } = useInterns();
  const [view, setView] = useState<DashboardView>("board");

  function handleStatusChange(taskId: string, status: TaskStatus) {
    updateTask(taskId, { status });
  }

  function handlePriorityChange(taskId: string, priority: TaskPriority) {
    updateTask(taskId, { priority });
  }

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col gap-4'>
      <ProjectHeader />
      <ViewTabs active={view} onChange={setView} />

      {loading && tasks.length === 0 && (
        <div className='py-12 text-center text-sm text-muted-foreground'>
          Yuklanmoqda…
        </div>
      )}

      {view === "summary" && (
        <BoardSummary tasks={tasks} interns={interns} />
      )}
      {view === "board" && (
        <TaskBoard tasks={tasks} onTasksChange={setTasks} interns={interns} />
      )}
      {view === "list" && (
        <IssueList
          tasks={tasks}
          interns={interns}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onDelete={removeTasks}
        />
      )}
    </div>
  );
}
