import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export interface SortableHeaderProps {
  label: string;
  active: boolean;
  asc: boolean;
  onClick: () => void;
  className?: string;
}

export function SortableHeader({
  label,
  active,
  asc,
  onClick,
  className,
}: SortableHeaderProps) {
  return (
    <th className={cn("px-3 py-2 font-medium", className)}>
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 tracking-wide uppercase transition-colors hover:text-foreground",
          active && "text-foreground"
        )}
      >
        {label}
        {active && (
          <ChevronDownIcon
            className={cn(
              "size-3 transition-transform",
              !asc && "rotate-180"
            )}
          />
        )}
      </button>
    </th>
  );
}
