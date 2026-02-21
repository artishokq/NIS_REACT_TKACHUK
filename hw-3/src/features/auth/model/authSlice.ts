import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/entities/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isInitialized = true;
      localStorage.setItem("token", action.payload.token);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isInitialized = true;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, setUser, setInitialized, logout } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
