import { memo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import "./Sidebar.css";

const navItems = [
  { path: ROUTES.DASHBOARD, labelKey: "nav.dashboard", icon: "📊" },
  { path: ROUTES.PRODUCTS, labelKey: "nav.products", icon: "📦" },
  { path: ROUTES.PROFILE, labelKey: "nav.profile", icon: "👤" },
  { path: ROUTES.SETTINGS, labelKey: "nav.settings", icon: "⚙️" },
] as const;

export const Sidebar = memo(function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">🛒</span>
        <span className="sidebar__logo-text">E-Commerce</span>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-text">{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
});
