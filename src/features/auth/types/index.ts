export type Role = "admin" | "intern";

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  internId?: string;
}

export type AuthUser = Omit<User, "password">;
