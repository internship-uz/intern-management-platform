import {
  BoardSkeleton,
  BoardSummary,
  IssueList,
  ListSkeleton,
  ProjectHeader,
  SummarySkeleton,
  TaskBoard,
  ViewTabs,
  type DashboardView,
} from "@/features/dashboard";
import { useInterns } from "@/features/interns";
import { useTasks, type TaskPriority, type TaskStatus } from "@/features/tasks";
import { useSearchParams } from "react-router-dom";

const ALLOWED_VIEWS: DashboardView[] = ["summary", "board", "list"];

function isValidView(value: string | null): value is DashboardView {
  return value !== null && ALLOWED_VIEWS.includes(value as DashboardView);
}

export default function DashboardPage() {
  const {
    tasks,
    setTasks,
    updateTask,
    removeTasks,
    loading: tasksLoading,
  } = useTasks();
  const { interns, loading: internsLoading } = useInterns();
  const [searchParams, setSearchParams] = useSearchParams();

  const viewParam = searchParams.get("view");
  const view: DashboardView = isValidView(viewParam) ? viewParam : "board";

  const isInitialLoading =
    (tasksLoading && tasks.length === 0) ||
    (internsLoading && interns.length === 0);

  function setView(next: DashboardView) {
    setSearchParams(
      (prev) => {
        prev.set("view", next);
        return prev;
      },
      { replace: true }
    );
  }

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

      {isInitialLoading ? (
        <>
          {view === "summary" && <SummarySkeleton />}
          {view === "board" && <BoardSkeleton />}
          {view === "list" && <ListSkeleton />}
        </>
      ) : (
        <>
          {view === "summary" && (
            <BoardSummary tasks={tasks} interns={interns} />
          )}
          {view === "board" && (
            <TaskBoard
              tasks={tasks}
              onTasksChange={setTasks}
              interns={interns}
            />
          )}
          {view === "list" && (
            <IssueList
              tasks={tasks}
              interns={interns}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onUpdateTask={updateTask}
              onDelete={removeTasks}
            />
          )}
        </>
      )}
    </div>
  );
}
