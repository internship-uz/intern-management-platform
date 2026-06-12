import { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n";
import type { Task } from "@/features/tasks";
import { useSubmissionsStore } from "../store/submissions.store";
import type { Submission } from "../types";

interface SubmitWorkDialogProps {
  task: Task;
  internId: string;
  /** Avval yuborilgan ish (changes_requested bo'lsa feedback ko'rsatiladi). */
  existing?: Submission;
  trigger: ReactElement;
}

export function SubmitWorkDialog({
  task,
  internId,
  existing,
  trigger,
}: SubmitWorkDialogProps) {
  const { t } = useTranslation();
  const submitWork = useSubmissionsStore((s) => s.submitWork);

  const [open, setOpen] = useState(false);
  const [githubLink, setGithubLink] = useState(existing?.githubLink ?? "");
  const [demoLink, setDemoLink] = useState(existing?.demoLink ?? "");
  const [comment, setComment] = useState(existing?.comment ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = githubLink.trim() !== "" && comment.trim() !== "";

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const result = await submitWork({
      taskId: task.id,
      internId,
      githubLink: githubLink.trim(),
      demoLink: demoLink.trim() || undefined,
      comment: comment.trim(),
    });
    setSubmitting(false);
    if (result) {
      setOpen(false);
    } else {
      setError(t("common.error"));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("submission.title")}</DialogTitle>
          <DialogDescription>
            {task.key} — {task.title}
          </DialogDescription>
        </DialogHeader>

        {existing?.status === "changes_requested" && existing.feedback ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <p className="font-medium">{t("submission.feedback")}</p>
            <p className="mt-1">{existing.feedback}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="githubLink">{t("submission.githubLink")}</Label>
            <Input
              id="githubLink"
              type="url"
              placeholder="https://github.com/..."
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="demoLink">{t("submission.demoLink")}</Label>
            <Input
              id="demoLink"
              type="url"
              placeholder="https://..."
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="comment">{t("submission.comment")}</Label>
            <textarea
              id="comment"
              rows={4}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit || submitting}>
            {submitting ? t("common.loading") : t("submission.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
