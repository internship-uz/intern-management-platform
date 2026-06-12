import type { AuthUser, Role } from "../types";

const STORAGE_KEY = "user";

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function getRole(): Role | null {
  return getCurrentUser()?.role ?? null;
}

export function hasRole(role: Role): boolean {
  return getRole() === role;
}

export function setCurrentUser(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getHomePathForRole(role: Role | null): string {
  return role === "intern" ? "/intern" : "/";
}
