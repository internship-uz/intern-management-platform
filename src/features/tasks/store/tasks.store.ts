import { useNotificationsStore } from "@/store/notifications-store";
import { create } from "zustand";
import { tasksApi } from "../api/tasks.api";
import type { Task, TaskPatch } from "../types";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetched: boolean;

  fetchTasks: () => Promise<void>;
  createTask: (data: Omit<Task, "id" | "key" | "createdAt">) => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  updateTask: (id: string, patch: TaskPatch) => Promise<void>;
  removeTasks: (ids: string[]) => Promise<void>;
}

function describeUpdate(prev: Task, patch: TaskPatch): string | null {
  if (patch.status && patch.status !== prev.status) {
    return `Status: ${prev.status} → ${patch.status}`;
  }
  if (patch.priority && patch.priority !== prev.priority) {
    return `Priority: ${prev.priority} → ${patch.priority}`;
  }
  if (patch.assigneeId && patch.assigneeId !== prev.assigneeId) {
    return "Mas'ul shaxs o‘zgartirildi";
  }
  if (patch.type && patch.type !== prev.type) {
    return `Type: ${prev.type} → ${patch.type}`;
  }
  return null;
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

  async createTask(data) {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      key: `IM-${Math.floor(Math.random() * 1000) + 1}`,
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      tasks: [...state.tasks, newTask]
    }));
    
    try {
      await tasksApi.create(newTask);
    } catch (err) {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== newTask.id),
        error: err instanceof Error ? err.message : "Create failed",
      }));
    }
  },

  async updateTask(id, patch) {
    const previous = get().tasks;
    const prevTask = previous.find((t) => t.id === id);

    set({
      tasks: previous.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });

    try {
      await tasksApi.update(id, patch);
      if (prevTask) {
        const description = describeUpdate(prevTask, patch);
        if (description) {
          useNotificationsStore.getState().add({
            kind: "task_updated",
            title: `${prevTask.key} — ${prevTask.title}`,
            description,
          });
        }
      }
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Update failed",
      });
    }
  },

  async removeTasks(ids) {
    const previous = get().tasks;
    const removing = previous.filter((t) => ids.includes(t.id));
    set({ tasks: previous.filter((t) => !ids.includes(t.id)) });

    try {
      await Promise.all(ids.map((id) => tasksApi.remove(id)));
      useNotificationsStore.getState().add({
        kind: "task_deleted",
        title:
          ids.length === 1
            ? `${removing[0]?.key ?? "Vazifa"} o‘chirildi`
            : `${ids.length} ta vazifa o‘chirildi`,
        description: removing
          .map((t) => t.title)
          .slice(0, 2)
          .join(", ") + (removing.length > 2 ? "..." : ""),
      });
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Delete failed",
      });
    }
  },
}));
