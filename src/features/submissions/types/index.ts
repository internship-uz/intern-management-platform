export type SubmissionStatus = "submitted" | "approved" | "changes_requested";

export interface Submission {
  id: string;
  taskId: string;
  internId: string;
  githubLink: string;
  demoLink?: string;
  comment: string;
  status: SubmissionStatus;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export type SubmissionInput = Pick<
  Submission,
  "taskId" | "internId" | "githubLink" | "demoLink" | "comment"
>;

export type SubmissionPatch = Partial<Omit<Submission, "id" | "createdAt">>;
