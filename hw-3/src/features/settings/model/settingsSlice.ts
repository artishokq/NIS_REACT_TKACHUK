import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import i18n from "@/shared/lib/i18n/i18n";

type Language = "en" | "ru";
type Theme = "light" | "dark";

interface SettingsState {
  language: Language;
  theme: Theme;
  pageSize: number;
}

function loadSettings(): SettingsState {
  const saved = localStorage.getItem("settings");
  if (saved) {
    try {
      return JSON.parse(saved) as SettingsState;
    } catch {
      // игнорируем
    }
  }
  return {
    language: (localStorage.getItem("language") as Language) || "en",
    theme: "light",
    pageSize: 12,
  };
}

const initialState: SettingsState = loadSettings();

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
      i18n.changeLanguage(action.payload);
      persistSettings(state);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      document.documentElement.setAttribute("data-theme", action.payload);
      persistSettings(state);
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      persistSettings(state);
    },
  },
});

function persistSettings(state: SettingsState) {
  localStorage.setItem("settings", JSON.stringify(state));
}

export const { setLanguage, setTheme, setPageSize } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
