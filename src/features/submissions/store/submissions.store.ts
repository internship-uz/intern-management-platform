import { create } from "zustand";
import { submissionsApi } from "../api/submissions.api";
import type { Submission, SubmissionInput, SubmissionPatch } from "../types";

interface SubmissionsState {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  fetched: boolean;

  fetchAll: () => Promise<void>;
  fetchByIntern: (internId: string) => Promise<void>;
  submitWork: (input: SubmissionInput) => Promise<Submission | null>;
  reviewSubmission: (id: string, patch: SubmissionPatch) => Promise<void>;
}

export const useSubmissionsStore = create<SubmissionsState>((set, get) => ({
  submissions: [],
  loading: false,
  error: null,
  fetched: false,

  async fetchAll() {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const submissions = await submissionsApi.getAll();
      set({ submissions, loading: false, fetched: true });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load submissions",
        loading: false,
      });
    }
  },

  async fetchByIntern(internId) {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const submissions = await submissionsApi.getByIntern(internId);
      set({ submissions, loading: false, fetched: true });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load submissions",
        loading: false,
      });
    }
  },

  async submitWork(input) {
    set({ error: null });
    try {
      const created = await submissionsApi.create(input);
      set((state) => ({ submissions: [...state.submissions, created] }));
      return created;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Submit failed" });
      return null;
    }
  },

  async reviewSubmission(id, patch) {
    const previous = get().submissions;
    set({
      submissions: previous.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
    try {
      await submissionsApi.update(id, patch);
    } catch (err) {
      set({
        submissions: previous,
        error: err instanceof Error ? err.message : "Review failed",
      });
    }
  },
}));
