import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useInternsStore } from "../store/interns.store";

export function useInterns() {
  const {
    interns,
    loading,
    error,
    fetched,
    fetchInterns,
    createIntern,
    updateIntern,
    removeIntern,
  } = useInternsStore(
    useShallow((s) => ({
      interns: s.interns,
      loading: s.loading,
      error: s.error,
      fetched: s.fetched,
      fetchInterns: s.fetchInterns,
      createIntern: s.createIntern,
      updateIntern: s.updateIntern,
      removeIntern: s.removeIntern,
    })),
  );

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
