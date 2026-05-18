import { useNotificationsStore } from "@/store/notifications-store";
import { create } from "zustand";
import { internsApi } from "../api/interns.api";
import type { Intern, InternPatch } from "../types";

interface InternsState {
  interns: Intern[];
  loading: boolean;
  error: string | null;
  fetched: boolean;

  fetchInterns: () => Promise<void>;
  createIntern: (intern: Omit<Intern, "id">) => Promise<void>;
  updateIntern: (id: string, patch: InternPatch) => Promise<void>;
  removeIntern: (id: string) => Promise<void>;
}

export const useInternsStore = create<InternsState>((set, get) => ({
  interns: [],
  loading: false,
  error: null,
  fetched: false,

  async fetchInterns() {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const interns = await internsApi.getAll();
      set({ interns, loading: false, fetched: true });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load interns",
        loading: false,
      });
    }
  },

  async createIntern(intern) {
    const created = await internsApi.create(intern);
    set({ interns: [...get().interns, created] });
    useNotificationsStore.getState().add({
      kind: "intern_added",
      title: "Yangi amaliyotchi qo‘shildi",
      description: `${created.name} (${created.direction}) jamoaga qo‘shildi`,
    });
  },

  async updateIntern(id, patch) {
    const previous = get().interns;
    set({
      interns: previous.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    });
    try {
      await internsApi.update(id, patch);
    } catch (err) {
      set({
        interns: previous,
        error: err instanceof Error ? err.message : "Update failed",
      });
    }
  },

  async removeIntern(id) {
    const previous = get().interns;
    const removing = previous.find((i) => i.id === id);
    set({ interns: previous.filter((i) => i.id !== id) });
    try {
      await internsApi.remove(id);
      if (removing) {
        useNotificationsStore.getState().add({
          kind: "intern_removed",
          title: "Amaliyotchi o‘chirildi",
          description: `${removing.name} jamoadan chiqarildi`,
        });
      }
    } catch (err) {
      set({
        interns: previous,
        error: err instanceof Error ? err.message : "Delete failed",
      });
    }
  },
}));
