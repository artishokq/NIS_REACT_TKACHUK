export { SettingsForm } from "./ui/SettingsForm/SettingsForm";
export {
  settingsReducer,
  setLanguage,
  setTheme,
  setPageSize,
} from "./model/settingsSlice";
export { selectLanguage, selectTheme, selectPageSize } from "./model/selectors";
