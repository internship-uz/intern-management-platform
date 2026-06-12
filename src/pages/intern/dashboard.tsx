import { useMemo } from "react";
import { useAuth } from "@/features/auth";
import { useMyTasks, InternTaskCard } from "@/features/tasks";
import { useMySubmissions } from "@/features/submissions";
import type { Submission } from "@/features/submissions";
import { useIntern } from "@/features/interns";
import { useTranslation } from "@/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InternDashboardPage() {
  const { t } = useTranslation();
  const { internId } = useAuth();
  const { intern } = useIntern(internId);
  const { tasks, loading, error, refetch } = useMyTasks(internId);
  const { submissions } = useMySubmissions(internId);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((task) => task.status === "done").length,
      inProgress: tasks.filter((task) => task.status === "in_progress").length,
      submitted: submissions.length,
    }),
    [tasks, submissions],
  );

  const submissionByTask = useMemo(() => {
    const map = new Map<string, Submission>();
    for (const s of submissions) map.set(s.taskId, s);
    return map;
  }, [submissions]);

  if (loading && tasks.length === 0) {
    return <p className="text-muted-foreground">{t("common.loading")}</p>;
  }

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

  const recentTasks = tasks.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">
        {t("intern.greeting")}
        {intern ? `, ${intern.name}` : ""} 👋
      </h1>

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
        <h2 className="text-lg font-semibold">{t("intern.recentTasks")}</h2>
        {recentTasks.length === 0 ? (
          <p className="text-muted-foreground">{t("common.empty")}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTasks.map((task) => (
              <InternTaskCard
                key={task.id}
                task={task}
                internId={internId!}
                submission={submissionByTask.get(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
