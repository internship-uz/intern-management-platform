import { apiClient } from "@/api/api-client";
import type { Submission, SubmissionInput, SubmissionPatch } from "../types";

export const submissionsApi = {
  getAll: async (): Promise<Submission[]> => {
    const { data } = await apiClient.get<Submission[]>("/submissions");
    return data;
  },

  getByIntern: async (internId: string): Promise<Submission[]> => {
    const { data } = await apiClient.get<Submission[]>("/submissions", {
      params: { internId },
    });
    return data;
  },

  getByTask: async (taskId: string): Promise<Submission[]> => {
    const { data } = await apiClient.get<Submission[]>("/submissions", {
      params: { taskId },
    });
    return data;
  },

  getById: async (id: string): Promise<Submission> => {
    const { data } = await apiClient.get<Submission>(`/submissions/${id}`);
    return data;
  },

  create: async (input: SubmissionInput): Promise<Submission> => {
    const now = new Date().toISOString();
    const payload: Omit<Submission, "id"> = {
      ...input,
      status: "submitted",
      feedback: "",
      createdAt: now,
      updatedAt: now,
    };
    const { data } = await apiClient.post<Submission>("/submissions", payload);
    return data;
  },

  update: async (id: string, patch: SubmissionPatch): Promise<Submission> => {
    const { data } = await apiClient.patch<Submission>(`/submissions/${id}`, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
    return data;
  },

  approve: async (id: string, feedback = ""): Promise<Submission> => {
    return submissionsApi.update(id, { status: "approved", feedback });
  },

  requestChanges: async (id: string, feedback: string): Promise<Submission> => {
    return submissionsApi.update(id, {
      status: "changes_requested",
      feedback,
    });
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/submissions/${id}`);
  },
};
