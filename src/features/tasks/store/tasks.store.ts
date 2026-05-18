import { create } from "zustand";
import { tasksApi } from "../api/tasks.api";
import type { Task, TaskPatch } from "../types";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetched: boolean;

  fetchTasks: () => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  updateTask: (id: string, patch: TaskPatch) => Promise<void>;
  removeTasks: (ids: string[]) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  fetched: false,

  async fetchTasks() {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const tasks = await tasksApi.getAll();
      set({ tasks, loading: false, fetched: true });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load tasks",
        loading: false,
      });
    }
  },

  setTasks(tasks) {
    set({ tasks });
  },

  async updateTask(id, patch) {
    const previous = get().tasks;
    set({
      tasks: previous.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
    try {
      await tasksApi.update(id, patch);
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Update failed",
      });
    }
  },

  async removeTasks(ids) {
    const previous = get().tasks;
    set({ tasks: previous.filter((t) => !ids.includes(t.id)) });
    try {
      await Promise.all(ids.map((id) => tasksApi.remove(id)));
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Delete failed",
      });
    }
  },
}));
