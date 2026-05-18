import type { Intern } from "@/features/interns";
import type { Task } from "@/features/tasks";
import { PriorityBreakdown } from "./priority-breakdown";
import { StatusOverview } from "./status-overview";
import { TeamWorkload } from "./team-workload";
import { Toolbar } from "./toolbar";
import { TopStats } from "./top-stats";
import { TypesOfWork } from "./types-of-work";

export interface BoardSummaryProps {
  tasks: Task[];
  interns: Intern[];
}

export function BoardSummary({ tasks, interns }: BoardSummaryProps) {
  return (
    <div className='flex flex-col gap-4'>
      <Toolbar />
      <TopStats tasks={tasks} />
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <StatusOverview tasks={tasks} />
        <TeamWorkload tasks={tasks} interns={interns} />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <PriorityBreakdown tasks={tasks} />
        <TypesOfWork tasks={tasks} />
      </div>
    </div>
  );
}
