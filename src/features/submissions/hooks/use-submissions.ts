import { useEffect } from "react";
import { useSubmissionsStore } from "../store/submissions.store";

export function useSubmissions() {
  const submissions = useSubmissionsStore((s) => s.submissions);
  const loading = useSubmissionsStore((s) => s.loading);
  const error = useSubmissionsStore((s) => s.error);
  const fetched = useSubmissionsStore((s) => s.fetched);
  const fetchAll = useSubmissionsStore((s) => s.fetchAll);
  const reviewSubmission = useSubmissionsStore((s) => s.reviewSubmission);

  useEffect(() => {
    if (!fetched) fetchAll();
  }, [fetched, fetchAll]);

  return { submissions, loading, error, reviewSubmission, refetch: fetchAll };
}

export function useMySubmissions(internId: string | undefined) {
  const submissions = useSubmissionsStore((s) => s.submissions);
  const loading = useSubmissionsStore((s) => s.loading);
  const error = useSubmissionsStore((s) => s.error);
  const fetchByIntern = useSubmissionsStore((s) => s.fetchByIntern);
  const submitWork = useSubmissionsStore((s) => s.submitWork);

  useEffect(() => {
    if (internId) fetchByIntern(internId);
  }, [internId, fetchByIntern]);

  return { submissions, loading, error, submitWork, refetch: fetchByIntern };
}
