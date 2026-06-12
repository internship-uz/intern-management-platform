import { useMemo } from "react";
import { useSubmissions, SubmissionReviewCard } from "@/features/submissions";
import { useInterns } from "@/features/interns";
import { useTasks } from "@/features/tasks";
import { useTranslation } from "@/i18n";
import { Button } from "@/components/ui/button";

export default function SubmissionsPage() {
  const { t } = useTranslation();
  const { submissions, loading, error, refetch } = useSubmissions();
  const { interns } = useInterns();
  const { tasks } = useTasks();

  const internName = useMemo(() => {
    const map = new Map(interns.map((i) => [i.id, i.name]));
    return (id: string) => map.get(id) ?? id;
  }, [interns]);

  const taskTitle = useMemo(() => {
    const map = new Map(tasks.map((task) => [task.id, task.title]));
    return (id: string) => map.get(id) ?? id;
  }, [tasks]);

  if (loading && submissions.length === 0) {
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
      <h1 className="text-2xl font-bold">{t("submission.reviewTitle")}</h1>

      {submissions.length === 0 ? (
        <p className="text-muted-foreground">{t("common.empty")}</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {submissions.map((submission) => (
            <SubmissionReviewCard
              key={submission.id}
              submission={submission}
              internName={internName(submission.internId)}
              taskTitle={taskTitle(submission.taskId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
