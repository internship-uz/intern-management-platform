import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n";
import type { SubmissionStatus } from "../types";

const VARIANT: Record<
  SubmissionStatus,
  "default" | "secondary" | "destructive"
> = {
  submitted: "secondary",
  approved: "default",
  changes_requested: "destructive",
};

export function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const { t } = useTranslation();
  return (
    <Badge variant={VARIANT[status]}>
      {t(`submission.status.${status}`)}
    </Badge>
  );
}
