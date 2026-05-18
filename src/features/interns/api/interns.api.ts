import { apiClient } from "@/api/api-client";
import type { Intern, InternPatch } from "../types";

export const internsApi = {
  getAll: async (): Promise<Intern[]> => {
    const { data } = await apiClient.get<Intern[]>("/interns");
    return data;
  },

  getById: async (id: string): Promise<Intern> => {
    const { data } = await apiClient.get<Intern>(`/interns/${id}`);
    return data;
  },

  create: async (intern: Omit<Intern, "id">): Promise<Intern> => {
    const { data } = await apiClient.post<Intern>("/interns", intern);
    return data;
  },

  update: async (id: string, patch: InternPatch): Promise<Intern> => {
    const { data } = await apiClient.patch<Intern>(`/interns/${id}`, patch);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/interns/${id}`);
  },
};
