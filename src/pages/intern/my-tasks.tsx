import { useMemo } from "react";
import { useAuth } from "@/features/auth";
import { useMyTasks, InternTaskCard } from "@/features/tasks";
import { useMySubmissions } from "@/features/submissions";
import type { Submission } from "@/features/submissions";
import { useTranslation } from "@/i18n";
import { Button } from "@/components/ui/button";

export default function InternTasksPage() {
  const { t } = useTranslation();
  const { internId } = useAuth();
  const { tasks, loading, error, refetch } = useMyTasks(internId);
  const { submissions } = useMySubmissions(internId);

  // Har bir task uchun eng so'nggi submission'ni topish.
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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{t("intern.myTasks")}</h1>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground">{t("common.empty")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
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
  );
}
