type Language = "en" | "ru";
type Theme = "light" | "dark";

interface RootStateWithSettings {
  settings: {
    language: Language;
    theme: Theme;
    pageSize: number;
  };
}

export const selectLanguage = (state: RootStateWithSettings) =>
  state.settings.language;
export const selectTheme = (state: RootStateWithSettings) =>
  state.settings.theme;
export const selectPageSize = (state: RootStateWithSettings) =>
  state.settings.pageSize;
