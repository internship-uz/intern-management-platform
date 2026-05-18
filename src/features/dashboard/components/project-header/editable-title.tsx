import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface EditableTitleProps {
  value: string;
  onChange: (v: string) => void;
}

export function EditableTitle({ value, onChange }: EditableTitleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEditing() {
    setDraft(value);
    setEditing(true);
  }

  function confirm() {
    const trimmed = draft.trim();
    if (trimmed) onChange(trimmed);
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  if (!editing) {
    return (
      <button
        onClick={startEditing}
        className='cursor-pointer text-left text-xl font-semibold tracking-tight'
      >
        {value}
      </button>
    );
  }

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") confirm();
          if (e.key === "Escape") cancel();
        }}
        className={cn(
          "w-full min-w-64 rounded-md border border-border bg-background px-2 py-1 text-xl font-semibold tracking-tight outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        )}
      />
      <div className='absolute top-full right-0 z-10 mt-1.5 flex gap-1 rounded-md border border-border/60 bg-popover p-0.5 shadow-md'>
        <button
          type='button'
          onClick={confirm}
          aria-label='Confirm'
          className='flex size-7 items-center justify-center rounded-sm transition-colors hover:bg-muted'
        >
          <CheckIcon className='size-4' />
        </button>
        <button
          type='button'
          onClick={cancel}
          aria-label='Cancel'
          className='flex size-7 items-center justify-center rounded-sm transition-colors hover:bg-muted'
        >
          <XIcon className='size-4' />
        </button>
      </div>
    </div>
  );
}
