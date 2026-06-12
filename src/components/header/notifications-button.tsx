import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import { useNotificationsStore } from "@/store/notifications-store";
import {
  BellIcon,
  CheckCircle2Icon,
  PencilIcon,
  PlusCircleIcon,
  Trash2Icon,
  UserMinusIcon,
  UserPlusIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const kindMeta: Record<
  string,
  { icon: LucideIcon; tint: string }
> = {
  task_updated: {
    icon: PencilIcon,
    tint: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  },
  task_created: {
    icon: PlusCircleIcon,
    tint: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  task_deleted: {
    icon: Trash2Icon,
    tint: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
  intern_added: {
    icon: UserPlusIcon,
    tint: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  intern_removed: {
    icon: UserMinusIcon,
    tint: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
};

type TFunc = ReturnType<typeof useTranslation>["t"];

function relativeTime(ts: number, now: number, t: TFunc) {
  const diff = now - ts;
  const minutes = Math.round(diff / 60_000);
  if (minutes < 1) return t("notifications.now");
  if (minutes < 60) return t("notifications.minutesAgo", { count: minutes });
  const hours = Math.round(minutes / 60);
  if (hours < 24) return t("notifications.hoursAgo", { count: hours });
  const days = Math.round(hours / 24);
  return t("notifications.daysAgo", { count: days });
}

export function NotificationsButton() {
  const { t } = useTranslation();
  const items = useNotificationsStore((s) => s.items);
  const markAllAsRead = useNotificationsStore((s) => s.markAllAsRead);
  const markAsRead = useNotificationsStore((s) => s.markAsRead);
  const clearAll = useNotificationsStore((s) => s.clearAll);

  const [now] = useState(() => Date.now());
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant='ghost' size='icon-sm' className='relative'>
            <BellIcon />
            {unreadCount > 0 && (
              <span className='absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground'>
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        }
      />
      <PopoverContent align='end' className='w-80 p-0'>
        <div className='flex items-center justify-between border-b border-border/60 px-3 py-2.5'>
          <span className='text-sm font-semibold'>
            {t("notifications.title")}
          </span>
          <div className='flex items-center gap-2'>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className='inline-flex items-center gap-1 text-xs text-primary hover:underline'
              >
                <CheckCircle2Icon className='size-3' />
                {t("notifications.markAll")}
              </button>
            )}
            {items.length > 0 && (
              <button
                onClick={clearAll}
                className='text-xs text-muted-foreground hover:text-foreground'
              >
                {t("notifications.clear")}
              </button>
            )}
          </div>
        </div>

        <ul className='max-h-96 overflow-y-auto'>
          {items.length === 0 && (
            <li className='flex flex-col items-center gap-2 px-3 py-10 text-center'>
              <BellIcon className='size-6 text-muted-foreground/60' />
              <span className='text-xs text-muted-foreground'>
                {t("notifications.empty")}
              </span>
            </li>
          )}
          {items.map((n) => {
            const meta = kindMeta[n.kind];
            const Icon = meta?.icon ?? BellIcon;
            return (
              <li
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "flex cursor-pointer gap-3 border-b border-border/40 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-muted/50",
                  !n.read && "bg-primary/5"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
                    meta?.tint ?? "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className='size-3.5' />
                </span>
                <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
                  <div className='flex items-start gap-2'>
                    <p className='line-clamp-1 flex-1 text-xs font-medium'>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span
                        className='mt-1 size-1.5 shrink-0 rounded-full bg-primary'
                        aria-hidden
                      />
                    )}
                  </div>
                  <p className='line-clamp-2 text-[11px] text-muted-foreground'>
                    {n.description}
                  </p>
                  <span className='text-[10px] text-muted-foreground'>
                    {relativeTime(n.createdAt, now, t)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
