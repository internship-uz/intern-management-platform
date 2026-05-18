import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Intern } from "@/features/interns";
import type { Task } from "@/features/tasks";
import { Panel } from "./panel";

export interface TeamWorkloadProps {
  tasks: Task[];
  interns: Intern[];
}

export function TeamWorkload({ tasks, interns }: TeamWorkloadProps) {
  const total = tasks.length || 1;
  const rows = interns
    .map((intern) => {
      const count = tasks.filter((t) => t.assigneeId === intern.id).length;
      return {
        intern,
        count,
        percent: Math.round((count / total) * 100),
      };
    })
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <Panel
      title='Team workload'
      hint='Monitor the capacity of your team.'
      link={{ label: "Reassign work items to get the right balance" }}
    >
      <table className='w-full text-xs'>
        <thead>
          <tr className='text-left text-[11px] font-medium tracking-wide text-muted-foreground uppercase'>
            <th className='pb-2 font-medium'>Assignee</th>
            <th className='pb-2 font-medium'>Work distribution</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ intern, count, percent }) => (
            <tr
              key={intern.id}
              className='border-t border-border/60 first:border-t-0'
            >
              <td className='py-2.5 pr-3'>
                <div className='flex items-center gap-2'>
                  <Avatar size='sm' className='size-5'>
                    <AvatarImage src={intern.avatar} />
                    <AvatarFallback>{intern.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className='truncate'>{intern.name}</span>
                </div>
              </td>
              <td className='py-2.5'>
                <div className='flex items-center gap-2'>
                  <div className='h-2 flex-1 overflow-hidden rounded-sm bg-muted'>
                    <div
                      className='h-full bg-muted-foreground/40'
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className='w-12 text-right text-muted-foreground tabular-nums'>
                    {count} · {percent}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
