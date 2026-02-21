import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLanguage,
  selectTheme,
  selectPageSize,
} from "../../model/selectors";
import { setLanguage, setTheme, setPageSize } from "../../model/settingsSlice";
import "./SettingsForm.css";

export const SettingsForm = memo(function SettingsForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const theme = useSelector(selectTheme);
  const pageSize = useSelector(selectPageSize);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLanguage(e.target.value as "en" | "ru"));
    },
    [dispatch],
  );

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setTheme(e.target.value as "light" | "dark"));
    },
    [dispatch],
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setPageSize(Number(e.target.value)));
    },
    [dispatch],
  );

  return (
    <div className="settings-form">
      <div className="settings-form__group">
        <label className="settings-form__label" htmlFor="language">
          {t("settings.language")}
        </label>
        <select
          id="language"
          className="settings-form__select"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">{t("settings.english")}</option>
          <option value="ru">{t("settings.russian")}</option>
        </select>
      </div>

      <div className="settings-form__group">
        <label className="settings-form__label" htmlFor="theme">
          {t("settings.theme")}
        </label>
        <select
          id="theme"
          className="settings-form__select"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="light">{t("settings.light")}</option>
          <option value="dark">{t("settings.dark")}</option>
        </select>
      </div>

      <div className="settings-form__group">
        <label className="settings-form__label" htmlFor="pageSize">
          {t("settings.pageSize")}
        </label>
        <select
          id="pageSize"
          className="settings-form__select"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>
    </div>
  );
});
