import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useSubmissionsStore } from "../store/submissions.store";

export function useSubmissions() {
  const { submissions, loading, error, fetched, fetchAll, reviewSubmission } =
    useSubmissionsStore(
      useShallow((s) => ({
        submissions: s.submissions,
        loading: s.loading,
        error: s.error,
        fetched: s.fetched,
        fetchAll: s.fetchAll,
        reviewSubmission: s.reviewSubmission,
      })),
    );

  useEffect(() => {
    if (!fetched) fetchAll();
  }, [fetched, fetchAll]);

  return { submissions, loading, error, reviewSubmission, refetch: fetchAll };
}

export function useMySubmissions(internId: string | undefined) {
  const { submissions, loading, error, fetchByIntern, submitWork } =
    useSubmissionsStore(
      useShallow((s) => ({
        submissions: s.submissions,
        loading: s.loading,
        error: s.error,
        fetchByIntern: s.fetchByIntern,
        submitWork: s.submitWork,
      })),
    );

  useEffect(() => {
    if (internId) fetchByIntern(internId);
  }, [internId, fetchByIntern]);

  return { submissions, loading, error, submitWork, refetch: fetchByIntern };
}
