import { cn } from "@/lib/utils";
import { useToastStore, type ToastType } from "@/store/toast-store";
import {
  CheckCircle2Icon,
  InfoIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON: Record<ToastType, LucideIcon> = {
  success: CheckCircle2Icon,
  error: XCircleIcon,
  info: InfoIcon,
};

const TINT: Record<ToastType, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-rose-600 dark:text-rose-400",
  info: "text-sky-600 dark:text-sky-400",
};

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-4 z-[100] flex w-full max-w-xs flex-col gap-2">
      {toasts.map((item) => {
        const Icon = ICON[item.type];
        return (
          <div
            key={item.id}
            className="flex items-center gap-2.5 rounded-md border border-border bg-popover px-3 py-2.5 text-sm shadow-lg animate-in slide-in-from-bottom-2 fade-in"
          >
            <Icon className={cn("size-4 shrink-0", TINT[item.type])} />
            <span className="flex-1">{item.message}</span>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Close"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
