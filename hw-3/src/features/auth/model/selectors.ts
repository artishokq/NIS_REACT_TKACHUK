import type { User } from "@/entities/user";

interface RootStateWithAuth {
  auth: {
    user: User | null;
    token: string | null;
    isInitialized: boolean;
  };
}

export const selectUser = (state: RootStateWithAuth) => state.auth.user;
export const selectToken = (state: RootStateWithAuth) => state.auth.token;
export const selectIsAuthenticated = (state: RootStateWithAuth) =>
  state.auth.token !== null;
export const selectIsInitialized = (state: RootStateWithAuth) =>
  state.auth.isInitialized;
