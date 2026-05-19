import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Intern } from "@/features/interns";
import type { Task } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { issueTypeMeta, priorityMeta } from "../issue-meta";

export interface IssueCardProps {
  task: Task;
  assignee?: Intern;
  isDragging: boolean;
  isOver: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: () => void;
}

export function IssueCard({
  task,
  assignee,
  isDragging,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: IssueCardProps) {
  const type = issueTypeMeta[task.type];
  const TypeIcon = type.icon;
  const priority = priorityMeta[task.priority];
  const PriorityIcon = priority.icon;

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDrop();
      }}
      className={cn(
        "group cursor-grab rounded-sm border border-border/60 bg-background p-2.5 shadow-xs hover:border-primary/40 hover:shadow-sm active:cursor-grabbing",
        isDragging && "opacity-40",
        isOver && "border-primary ring-1 ring-primary/40"
      )}
    >
      <p className='text-[13px] leading-snug font-medium'>{task.title}</p>

      {task.labels && task.labels.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-1'>
          {task.labels.map((label) => (
            <span
              key={label}
              className='rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase'
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className='mt-3 flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5'>
          <span
            title={type.label}
            className={cn(
              "flex size-4 items-center justify-center rounded-sm text-white",
              type.bg
            )}
          >
            <TypeIcon className='size-2.5' />
          </span>
          <span className='text-[11px] font-medium tracking-wide text-muted-foreground'>
            {task.key}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <PriorityIcon
            className={cn("size-3.5", priority.color)}
            aria-label={priority.label}
          />
          {task.storyPoints != null && (
            <span className='flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground'>
              {task.storyPoints}
            </span>
          )}
          {assignee && (
            <Avatar size='sm' className='size-5'>
              <AvatarImage src={assignee.avatar} />
              <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </article>
  );
}
