import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n";
import type { TaskStatus } from "../types";

const VARIANT: Record<TaskStatus, "default" | "secondary" | "outline"> = {
  todo: "outline",
  in_progress: "secondary",
  done: "default",
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const { t } = useTranslation();
  return <Badge variant={VARIANT[status]}>{t(`task.${status}`)}</Badge>;
}
