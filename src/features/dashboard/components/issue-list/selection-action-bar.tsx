import { useTranslation } from "@/i18n";
import { PencilIcon, Trash2Icon, XIcon } from "lucide-react";

export interface SelectionActionBarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onEditFields: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export function SelectionActionBar({
  selectedCount,
  onSelectAll,
  onEditFields,
  onDelete,
  onClear,
}: SelectionActionBarProps) {
  const { t } = useTranslation();
  if (selectedCount === 0) return null;

  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4'>
      <div className='pointer-events-auto flex items-center gap-1 rounded-md border border-border bg-popover px-2 py-1.5 text-sm shadow-lg'>
        <span className='rounded-sm bg-muted px-2 py-1 text-xs font-medium tabular-nums'>
          {t("board.selected", { count: selectedCount })}
        </span>

        <button
          type='button'
          onClick={onSelectAll}
          className='inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs transition-colors hover:bg-muted'
        >
          {t("board.selectAll")}
        </button>

        <Divider />

        <button
          type='button'
          onClick={onEditFields}
          className='inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs transition-colors hover:bg-muted'
        >
          <PencilIcon className='size-3.5' />
          {t("board.editFields")}
        </button>

        <button
          type='button'
          onClick={onDelete}
          className='inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-destructive transition-colors hover:bg-destructive/10'
        >
          <Trash2Icon className='size-3.5' />
          {t("board.delete")}
        </button>

        <Divider />

        <button
          type='button'
          onClick={onClear}
          aria-label='Clear selection'
          className='flex size-7 items-center justify-center rounded-sm transition-colors hover:bg-muted'
        >
          <XIcon className='size-3.5' />
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <span className='mx-1 h-5 w-px bg-border' />;
}
