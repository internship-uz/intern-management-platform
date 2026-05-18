import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Intern } from "@/features/interns";
import type {
  IssueType,
  Task,
  TaskPatch,
  TaskPriority,
  TaskStatus,
} from "@/features/tasks";
import { useEffect, useState } from "react";

export interface EditFieldsDialogProps {
  open: boolean;
  tasks: Task[];
  interns: Intern[];
  onClose: () => void;
  onApply: (patch: TaskPatch) => void;
}

function commonValue<T>(values: T[]): T | "" {
  if (values.length === 0) return "";
  const first = values[0];
  return values.every((v) => v === first) ? first : ("" as T | "");
}

export function EditFieldsDialog({
  open,
  tasks,
  interns,
  onClose,
  onApply,
}: EditFieldsDialogProps) {
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [type, setType] = useState<IssueType | "">("");
  const [assigneeId, setAssigneeId] = useState<string>("");

  const [initial, setInitial] = useState<{
    status: TaskStatus | "";
    priority: TaskPriority | "";
    type: IssueType | "";
    assigneeId: string;
  }>({ status: "", priority: "", type: "", assigneeId: "" });

  useEffect(() => {
    if (!open) return;
    const init = {
      status: commonValue(tasks.map((t) => t.status)),
      priority: commonValue(tasks.map((t) => t.priority)),
      type: commonValue(tasks.map((t) => t.type)),
      assigneeId: commonValue(tasks.map((t) => t.assigneeId)),
    };
    setStatus(init.status);
    setPriority(init.priority);
    setType(init.type);
    setAssigneeId(init.assigneeId);
    setInitial(init);
  }, [open, tasks]);

  function handleApply() {
    const patch: TaskPatch = {};
    if (status && status !== initial.status) patch.status = status;
    if (priority && priority !== initial.priority) patch.priority = priority;
    if (type && type !== initial.type) patch.type = type;
    if (assigneeId && assigneeId !== initial.assigneeId)
      patch.assigneeId = assigneeId;

    if (Object.keys(patch).length > 0) onApply(patch);
    onClose();
  }

  function handleClose(value: boolean) {
    if (!value) onClose();
  }

  const hasChanges =
    (!!status && status !== initial.status) ||
    (!!priority && priority !== initial.priority) ||
    (!!type && type !== initial.type) ||
    (!!assigneeId && assigneeId !== initial.assigneeId);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit fields</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-3 py-2'>
          <Field label='Status'>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as TaskStatus)}
            >
              <SelectTrigger size='sm' className='w-full'>
                <SelectValue placeholder='Multiple values' />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value='todo'>To do</SelectItem>
                <SelectItem value='in_progress'>In progress</SelectItem>
                <SelectItem value='done'>Done</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label='Priority'>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as TaskPriority)}
            >
              <SelectTrigger size='sm' className='w-full'>
                <SelectValue placeholder='Multiple values' />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value='highest'>Highest</SelectItem>
                <SelectItem value='high'>High</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='low'>Low</SelectItem>
                <SelectItem value='lowest'>Lowest</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label='Type'>
            <Select
              value={type}
              onValueChange={(v) => setType(v as IssueType)}
            >
              <SelectTrigger size='sm' className='w-full'>
                <SelectValue placeholder='Multiple values' />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value='story'>Story</SelectItem>
                <SelectItem value='task'>Task</SelectItem>
                <SelectItem value='bug'>Bug</SelectItem>
                <SelectItem value='epic'>Epic</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label='Assignee'>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger size='sm' className='w-full'>
                <SelectValue placeholder='Multiple values'>
                  {(value: string) =>
                    interns.find((i) => i.id === value)?.name ??
                    "Multiple values"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {interns.map((i) => (
                  <SelectItem key={i.id} value={i.id}>
                    {i.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant='outline' size='sm'>
                Cancel
              </Button>
            }
          />
          <Button size='sm' onClick={handleApply} disabled={!hasChanges}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-xs font-medium text-muted-foreground'>
        {label}
      </label>
      {children}
    </div>
  );
}
