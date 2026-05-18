export type Direction =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Design"
  | "QA"
  | "DevOps";

export type Level = "Junior" | "Middle" | "Senior";

export type InternStatus = "active" | "paused" | "graduated";

export interface Intern {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  direction: Direction;
  level: Level;
  status: InternStatus;
  joinedAt: string;
}

export type InternPatch = Partial<Omit<Intern, "id">>;
