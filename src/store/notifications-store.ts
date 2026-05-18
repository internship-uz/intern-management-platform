import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationKind =
  | "task_updated"
  | "task_created"
  | "task_deleted"
  | "intern_added"
  | "intern_removed";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  createdAt: number;
  read: boolean;
}

interface NotificationsState {
  items: NotificationItem[];
  add: (input: Omit<NotificationItem, "id" | "createdAt" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeOne: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      items: [],

      add(input) {
        const item: NotificationItem = {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          read: false,
          ...input,
        };
        set((s) => ({ items: [item, ...s.items].slice(0, 50) }));
      },

      markAsRead(id) {
        set((s) => ({
          items: s.items.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllAsRead() {
        set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) }));
      },

      removeOne(id) {
        set((s) => ({ items: s.items.filter((n) => n.id !== id) }));
      },

      clearAll() {
        set({ items: [] });
      },
    }),
    {
      name: "im:notifications",
      version: 1,
    }
  )
);
