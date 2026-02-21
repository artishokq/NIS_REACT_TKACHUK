import { useTranslation } from "react-i18next";
import { SettingsForm } from "@/features/settings";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">{t("settings.title")}</h1>
      <div className="settings-page__card">
        <SettingsForm />
      </div>
    </div>
  );
}
