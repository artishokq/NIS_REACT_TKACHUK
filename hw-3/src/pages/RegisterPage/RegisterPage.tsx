import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import "./RegisterPage.css";

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div className="register-page">
      <div className="register-page__card">
        <h1 className="register-page__title">{t("auth.registerTitle")}</h1>
        <div className="register-page__stub">
          <p className="register-page__stub-icon">🚧</p>
          <p className="register-page__stub-text">{t("auth.registerStub")}</p>
        </div>
        <p className="register-page__link">
          <Link to={ROUTES.LOGIN}>{t("auth.loginLink")}</Link>
        </p>
      </div>
    </div>
  );
}
