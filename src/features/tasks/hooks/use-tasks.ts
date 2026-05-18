import { useEffect } from "react";
import { useTasksStore } from "../store/tasks.store";

export function useTasks() {
  const tasks = useTasksStore((s) => s.tasks);
  const loading = useTasksStore((s) => s.loading);
  const error = useTasksStore((s) => s.error);
  const fetched = useTasksStore((s) => s.fetched);
  const fetchTasks = useTasksStore((s) => s.fetchTasks);
  const setTasks = useTasksStore((s) => s.setTasks);
  const updateTask = useTasksStore((s) => s.updateTask);
  const removeTasks = useTasksStore((s) => s.removeTasks);

  useEffect(() => {
    if (!fetched) fetchTasks();
  }, [fetched, fetchTasks]);

  return {
    tasks,
    loading,
    error,
    setTasks,
    updateTask,
    removeTasks,
    refetch: fetchTasks,
  };
}
