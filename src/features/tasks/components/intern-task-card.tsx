import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n";
import { SubmissionStatusBadge } from "@/features/submissions/components/submission-status-badge";
import { SubmitWorkDialog } from "@/features/submissions/components/submit-work-dialog";
import type { Submission } from "@/features/submissions";
import { CalendarIcon, FlagIcon } from "lucide-react";
import type { Task } from "../types";
import { TaskStatusBadge } from "./task-status-badge";

interface InternTaskCardProps {
  task: Task;
  internId: string;
  submission?: Submission;
}

export function InternTaskCard({
  task,
  internId,
  submission,
}: InternTaskCardProps) {
  const { t } = useTranslation();

  // submitted yoki approved bo'lsa qayta yuborib bo'lmaydi; changes_requested bo'lsa qayta yuborish mumkin.
  const canSubmit =
    !submission || submission.status === "changes_requested";

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-2">
          <span>
            <span className="text-muted-foreground">{task.key}</span> ·{" "}
            {task.title}
          </span>
          <TaskStatusBadge status={task.status} />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <FlagIcon className="size-4" />
          <span>
            {t("task.priority")}: {task.priority}
          </span>
        </div>
        {task.dueDate ? (
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <span>
              {t("intern.deadline")}: {task.dueDate}
            </span>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="justify-between gap-2">
        {submission ? (
          <SubmissionStatusBadge status={submission.status} />
        ) : (
          <span className="text-xs text-muted-foreground">
            {t("intern.taskStatus")}
          </span>
        )}
        {canSubmit ? (
          <SubmitWorkDialog
            task={task}
            internId={internId}
            existing={submission}
            trigger={
              <Button size="sm">
                {submission ? t("common.submit") : t("submission.submit")}
              </Button>
            }
          />
        ) : null}
      </CardFooter>
    </Card>
  );
}
