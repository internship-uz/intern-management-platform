import { useMemo, useState } from "react";
import { useAuth } from "@/features/auth";
import { useMyTasks } from "@/features/tasks";
import { useMySubmissions } from "@/features/submissions";
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
import { useTranslation } from "@/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InternDashboardPage() {
  const { t } = useTranslation();
  const { internId } = useAuth();
  const { intern } = useIntern(internId);
  const { tasks, loading, error, refetch, updateTask, setTasks } =
    useMyTasks(internId);
  const { submissions } = useMySubmissions(internId);
  const [view, setView] = useState<DashboardView>("board");

  const interns = intern ? [intern] : [];
  const isInitialLoading = loading && tasks.length === 0;

  const stats = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((task) => task.status === "done").length,
      inProgress: tasks.filter((task) => task.status === "in_progress").length,
      submitted: submissions.length,
    }),
    [tasks, submissions],
  );

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

  const cards = [
    { label: t("intern.totalTasks"), value: stats.total },
    { label: t("task.in_progress"), value: stats.inProgress },
    { label: t("task.done"), value: stats.done },
    { label: t("intern.submittedWorks"), value: stats.submitted },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} size="sm">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4">
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
                selectable={false}
                onStatusChange={(id, status) => updateTask(id, { status })}
                onPriorityChange={(id, priority) =>
                  updateTask(id, { priority })
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
