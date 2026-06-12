import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n";
import { ExternalLinkIcon } from "lucide-react";
import { useSubmissionsStore } from "../store/submissions.store";
import type { Submission } from "../types";
import { SubmissionStatusBadge } from "./submission-status-badge";

interface SubmissionReviewCardProps {
  submission: Submission;
  internName: string;
  taskTitle: string;
}

export function SubmissionReviewCard({
  submission,
  internName,
  taskTitle,
}: SubmissionReviewCardProps) {
  const { t } = useTranslation();
  const reviewSubmission = useSubmissionsStore((s) => s.reviewSubmission);

  const [feedback, setFeedback] = useState(submission.feedback ?? "");
  const [busy, setBusy] = useState(false);

  async function handleReview(
    status: "approved" | "changes_requested",
  ) {
    setBusy(true);
    await reviewSubmission(submission.id, { status, feedback: feedback.trim() });
    setBusy(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>
            <span className="text-muted-foreground">
              {t("submission.intern")}:
            </span>{" "}
            {internName}
          </span>
          <SubmissionStatusBadge status={submission.status} />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("submission.task")}: {taskTitle}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={submission.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLinkIcon className="size-3.5" />
            {t("submission.githubLink")}
          </a>
          {submission.demoLink ? (
            <a
              href={submission.demoLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLinkIcon className="size-3.5" />
              {t("submission.demoLink")}
            </a>
          ) : null}
        </div>

        <p className="rounded-md bg-muted/50 p-3 text-sm">{submission.comment}</p>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`feedback-${submission.id}`}>
            {t("submission.feedback")}
          </Label>
          <textarea
            id={`feedback-${submission.id}`}
            rows={2}
            placeholder={t("submission.feedbackPlaceholder")}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => handleReview("changes_requested")}
          >
            {t("submission.requestChanges")}
          </Button>
          <Button
            size="sm"
            disabled={busy}
            onClick={() => handleReview("approved")}
          >
            {t("submission.approve")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
