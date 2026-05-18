import type { IssueType, Task } from "@/features/tasks";
import { cn } from "@/lib/utils";
import { issueTypeMeta } from "../issue-meta";
import { Panel } from "./panel";

export interface TypesOfWorkProps {
  tasks: Task[];
}

export function TypesOfWork({ tasks }: TypesOfWorkProps) {
  const types: IssueType[] = ["task", "story", "bug", "epic"];
  const total = tasks.length || 1;
  const rows = types.map((t) => {
    const count = tasks.filter((task) => task.type === t).length;
    return {
      key: t,
      label: issueTypeMeta[t].label,
      bg: issueTypeMeta[t].bg,
      icon: issueTypeMeta[t].icon,
      count,
      percent: Math.round((count / total) * 100),
    };
  });

  return (
    <Panel
      title='Types of work'
      hint='Get a breakdown of work items by their types.'
      link={{ label: "View all items" }}
    >
      <table className='w-full text-xs'>
        <thead>
          <tr className='text-left text-[11px] font-medium tracking-wide text-muted-foreground uppercase'>
            <th className='pb-2 font-medium'>Type</th>
            <th className='pb-2 font-medium'>Distribution</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <tr
                key={row.key}
                className='border-t border-border/60 first:border-t-0'
              >
                <td className='py-2.5 pr-3'>
                  <div className='flex items-center gap-2'>
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm text-white",
                        row.bg
                      )}
                    >
                      <Icon className='size-2.5' />
                    </span>
                    <span>{row.label}</span>
                  </div>
                </td>
                <td className='py-2.5'>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 flex-1 overflow-hidden rounded-sm bg-muted'>
                      <div
                        className='h-full bg-muted-foreground/40'
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className='w-10 text-right text-muted-foreground tabular-nums'>
                      {row.percent}%
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}
