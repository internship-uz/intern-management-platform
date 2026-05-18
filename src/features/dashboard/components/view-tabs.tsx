import { cn } from "@/lib/utils";
import {
  KanbanSquareIcon,
  LayoutListIcon,
  PanelsTopLeftIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DashboardView = "summary" | "board" | "list";

const tabs: { key: DashboardView; label: string; icon: LucideIcon }[] = [
  { key: "summary", label: "Summary", icon: PanelsTopLeftIcon },
  { key: "board", label: "Board", icon: KanbanSquareIcon },
  { key: "list", label: "List", icon: LayoutListIcon },
];

export function ViewTabs({
  active,
  onChange,
}: {
  active: DashboardView;
  onChange: (v: DashboardView) => void;
}) {
  return (
    <div className='flex items-center gap-1 border-b border-border/60'>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              "relative flex items-center gap-1.5 border-b-2 px-3 py-2 text-[13px] font-medium transition-colors",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className='size-3.5' />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
