export type InternLevel = "junior" | "middle" | "senior";

export type InternStatus = "active" | "inactive" | "graduated";

export type Direction =
  | "frontend"
  | "backend"
  | "mobile"
  | "design"
  | "qa"
  | "devops";

export type Intern = {
  id: string;
  fullName: string;
  email: string;
  direction: Direction;
  level: InternLevel;
  status: InternStatus;
  createdAt: string;
};

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  internId: string;
  status: TaskStatus;
  createdAt: string;
};
