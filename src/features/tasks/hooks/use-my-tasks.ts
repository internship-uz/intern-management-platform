import { useCallback, useEffect, useState } from "react";
import { tasksApi } from "../api/tasks.api";
import type { Task, TaskPatch } from "../types";

interface UseMyTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateTask: (id: string, patch: TaskPatch) => Promise<void>;
  setTasks: (next: Task[]) => void;
}

/**
 * Intern uchun faqat o'ziga biriktirilgan (assigneeId) vazifalarni oladi.
 * Admin board uchun ishlatiladigan global tasks store'ga tegmaydi.
 */
export function useMyTasks(internId: string | undefined): UseMyTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyTasks = useCallback(async () => {
    if (!internId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getByAssignee(internId);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [internId]);

  const updateTask = useCallback(async (id: string, patch: TaskPatch) => {
    const previous = tasks;
    setTasks((curr) =>
      curr.map((task) => (task.id === id ? { ...task, ...patch } : task)),
    );
    try {
      await tasksApi.update(id, patch);
    } catch {
      setTasks(previous);
    }
  }, [tasks]);

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchMyTasks,
    updateTask,
    setTasks,
  };
}
