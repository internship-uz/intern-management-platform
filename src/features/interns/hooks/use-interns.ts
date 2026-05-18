import { useEffect } from "react";
import { useInternsStore } from "../store/interns.store";

export function useInterns() {
  const interns = useInternsStore((s) => s.interns);
  const loading = useInternsStore((s) => s.loading);
  const error = useInternsStore((s) => s.error);
  const fetched = useInternsStore((s) => s.fetched);
  const fetchInterns = useInternsStore((s) => s.fetchInterns);
  const createIntern = useInternsStore((s) => s.createIntern);
  const updateIntern = useInternsStore((s) => s.updateIntern);
  const removeIntern = useInternsStore((s) => s.removeIntern);

  useEffect(() => {
    if (!fetched) fetchInterns();
  }, [fetched, fetchInterns]);

  return {
    interns,
    loading,
    error,
    createIntern,
    updateIntern,
    removeIntern,
    refetch: fetchInterns,
  };
}
