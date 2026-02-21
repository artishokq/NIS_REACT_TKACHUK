import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">{t("common.notFound")}</p>
        <Link to={ROUTES.DASHBOARD} className="not-found__link">
          {t("common.goHome")}
        </Link>
      </div>
    </div>
  );
}
