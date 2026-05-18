import type { Task, TaskStatus } from "@/features/tasks";
import { statusMeta } from "../issue-meta";
import { DonutChart } from "./donut-chart";
import { Legend } from "./legend";
import { Panel } from "./panel";

const statusChartColor: Record<TaskStatus, string> = {
  todo: "text-slate-400",
  in_progress: "text-sky-500",
  done: "text-emerald-500",
};

export interface StatusOverviewProps {
  tasks: Task[];
}

export function StatusOverview({ tasks }: StatusOverviewProps) {
  const statuses: TaskStatus[] = ["todo", "in_progress", "done"];
  const total = tasks.length;
  const segments = statuses.map((s) => ({
    key: s,
    label: statusMeta[s].label,
    count: tasks.filter((t) => t.status === s).length,
    dot: statusMeta[s].dot,
    color: statusChartColor[s],
  }));

  return (
    <Panel
      title='Status overview'
      hint='Get a snapshot of the status of your work items.'
      link={{ label: "View all work items" }}
    >
      <div className='flex flex-wrap items-center gap-8'>
        <DonutChart
          total={total}
          centerLabel='Total work items'
          segments={segments}
        />
        <Legend segments={segments} total={total} />
      </div>
    </Panel>
  );
}
