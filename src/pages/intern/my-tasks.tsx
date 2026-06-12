import { useState } from "react";
import { useAuth } from "@/features/auth";
import { useMyTasks } from "@/features/tasks";
import { useIntern } from "@/features/interns";
import {
  BoardSkeleton,
  BoardSummary,
  IssueList,
  ListSkeleton,
  SummarySkeleton,
  TaskBoard,
  ViewTabs,
  type DashboardView,
} from "@/features/dashboard";
import { SubmitWorkDialog } from "@/features/submissions";
import { useTranslation } from "@/i18n";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

export default function InternTasksPage() {
  const { t } = useTranslation();
  const { internId } = useAuth();
  const { intern } = useIntern(internId);
  const { tasks, loading, error, refetch, updateTask, setTasks } =
    useMyTasks(internId);
  const [view, setView] = useState<DashboardView>("board");

  const interns = intern ? [intern] : [];
  const isInitialLoading = loading && tasks.length === 0;

  if (error) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-destructive">{t("common.error")}</p>
        <Button variant="outline" size="sm" onClick={refetch}>
          {t("common.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t("intern.myTasks")}</h1>
        {tasks.length > 0 && internId ? (
          <SubmitWorkDialog
            internId={internId}
            tasks={tasks}
            trigger={
              <Button size="sm">
                <SendIcon className="size-4" />
                {t("submission.submit")}
              </Button>
            }
          />
        ) : null}
      </div>

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
            <TaskBoard tasks={tasks} onTasksChange={setTasks} interns={interns} />
          )}
          {view === "list" && (
            <IssueList
              tasks={tasks}
              interns={interns}
              selectable={false}
              onStatusChange={(id, status) => updateTask(id, { status })}
              onPriorityChange={(id, priority) => updateTask(id, { priority })}
            />
          )}
        </>
      )}
    </div>
  );
}
