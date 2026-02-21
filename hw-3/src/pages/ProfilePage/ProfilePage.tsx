import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, logout } from "@/features/auth";
import { Button } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <h1 className="profile-page__title">{t("profile.title")}</h1>

      <div className="profile-page__card">
        <div className="profile-page__avatar-section">
          <img
            src={user.image}
            alt={user.firstName}
            className="profile-page__avatar"
          />
          <h2 className="profile-page__name">
            {user.firstName} {user.lastName}
          </h2>
          <p className="profile-page__username">@{user.username}</p>
        </div>

        <div className="profile-page__details">
          <div className="profile-page__field">
            <span className="profile-page__label">{t("profile.name")}</span>
            <span className="profile-page__value">
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className="profile-page__field">
            <span className="profile-page__label">{t("profile.email")}</span>
            <span className="profile-page__value">{user.email}</span>
          </div>
          <div className="profile-page__field">
            <span className="profile-page__label">{t("profile.username")}</span>
            <span className="profile-page__value">{user.username}</span>
          </div>
          {user.phone && (
            <div className="profile-page__field">
              <span className="profile-page__label">{t("profile.phone")}</span>
              <span className="profile-page__value">{user.phone}</span>
            </div>
          )}
        </div>

        <div className="profile-page__actions">
          <Button variant="danger" onClick={handleLogout}>
            {t("profile.logoutButton")}
          </Button>
        </div>
      </div>
    </div>
  );
}
