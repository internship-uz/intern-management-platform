import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTasksStore } from "../store/tasks.store";

export function useTasks() {
  const {
    tasks,
    loading,
    error,
    fetched,
    fetchTasks,
    setTasks,
    createTask,
    updateTask,
    removeTasks,
  } = useTasksStore(
    useShallow((s) => ({
      tasks: s.tasks,
      loading: s.loading,
      error: s.error,
      fetched: s.fetched,
      fetchTasks: s.fetchTasks,
      setTasks: s.setTasks,
      createTask: s.createTask,
      updateTask: s.updateTask,
      removeTasks: s.removeTasks,
    })),
  );

  useEffect(() => {
    if (!fetched) fetchTasks();
  }, [fetched, fetchTasks]);

  return {
    tasks,
    loading,
    error,
    setTasks,
    createTask,
    updateTask,
    removeTasks,
    refetch: fetchTasks,
  };
}
