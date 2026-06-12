import { apiClient } from "@/api/api-client";
import type { Task, TaskPatch } from "../types";

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await apiClient.get<Task[]>("/tasks");
    return data;
  },

  getById: async (id: string): Promise<Task> => {
    const { data } = await apiClient.get<Task>(`/tasks/${id}`);
    return data;
  },

  getByAssignee: async (assigneeId: string): Promise<Task[]> => {
    const { data } = await apiClient.get<Task[]>("/tasks", {
      params: { assigneeId },
    });
    return data;
  },

  create: async (task: Omit<Task, "id">): Promise<Task> => {
    const { data } = await apiClient.post<Task>("/tasks", task);
    return data;
  },

  update: async (id: string, patch: TaskPatch): Promise<Task> => {
    const { data } = await apiClient.patch<Task>(`/tasks/${id}`, patch);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
