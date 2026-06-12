import { useCallback, useEffect, useState } from "react";
import { internsApi } from "../api/interns.api";
import type { Intern } from "../types";

interface UseInternResult {
  intern: Intern | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Bitta internni id bo'yicha oladi (intern profil sahifasi uchun). */
export function useIntern(id: string | undefined): UseInternResult {
  const [intern, setIntern] = useState<Intern | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIntern = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await internsApi.getById(id);
      setIntern(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchIntern();
  }, [fetchIntern]);

  return { intern, loading, error, refetch: fetchIntern };
}
