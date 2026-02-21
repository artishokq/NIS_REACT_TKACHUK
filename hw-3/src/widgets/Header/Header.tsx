import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, logout } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import "./Header.css";

export const Header = memo(function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  return (
    <header className="header">
      <h2 className="header__title">{t("header.title")}</h2>
      <div className="header__right">
        {user && (
          <div className="header__user">
            <img
              src={user.image}
              alt={user.firstName}
              className="header__avatar"
            />
            <span className="header__username">
              {user.firstName} {user.lastName}
            </span>
          </div>
        )}
        <button
          className="header__logout"
          onClick={handleLogout}
          title={t("common.logout")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
});
