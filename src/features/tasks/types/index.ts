export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "lowest" | "low" | "medium" | "high" | "highest";
export type IssueType = "story" | "task" | "bug" | "epic";

export interface Task {
  id: string;
  key: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: IssueType;
  assigneeId: string;
  createdAt: string;
  dueDate?: string;
  storyPoints?: number;
  labels?: string[];
}

export type TaskPatch = Partial<Omit<Task, "id">>;
