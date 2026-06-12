import { apiClient } from "@/api/api-client";
import type { AuthUser, User } from "../types";

export const authApi = {
  login: async (email: string, password: string): Promise<AuthUser | null> => {
    const { data } = await apiClient.get<User[]>("/users", {
      params: { email, password },
    });
    if (!data || data.length === 0) return null;
    const { password: _pw, ...authUser } = data[0];
    return authUser;
  },
};
