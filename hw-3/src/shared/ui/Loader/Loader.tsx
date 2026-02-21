import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./Loader.css";

interface LoaderProps {
  fullPage?: boolean;
}

export const Loader = memo(function Loader({ fullPage = false }: LoaderProps) {
  const { t } = useTranslation();

  return (
    <div className={`loader ${fullPage ? "loader--full" : ""}`}>
      <div className="loader__spinner" />
      <p className="loader__text">{t("common.loading")}</p>
    </div>
  );
});
