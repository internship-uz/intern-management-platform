import type { Intern } from "@/features/interns";
import type { Task } from "@/features/tasks";
import { PriorityBreakdown } from "./priority-breakdown";
import { TeamWorkload } from "./team-workload";

export interface BoardSummaryProps {
  tasks: Task[];
  interns: Intern[];
}

export function BoardSummary({ tasks, interns }: BoardSummaryProps) {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <PriorityBreakdown tasks={tasks} />
      <TeamWorkload tasks={tasks} interns={interns} />
    </div>
  );
}
