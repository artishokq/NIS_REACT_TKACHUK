import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "@/features/auth";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/features/products";
import { Loader } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetProductsQuery({ limit: 5, skip: 0 });
  const { data: categories } = useGetCategoriesQuery();

  const stats = useMemo(() => {
    if (!data) return [];
    return [
      { label: t("dashboard.totalProducts"), value: data.total, icon: "📦" },
      {
        label: t("dashboard.categories"),
        value: categories?.length ?? 0,
        icon: "🏷️",
      },
    ];
  }, [data, categories, t]);

  if (isLoading) return <Loader />;

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">{t("dashboard.title")}</h1>
      <p className="dashboard__welcome">
        {t("dashboard.welcome")}, <strong>{user?.firstName}</strong>! 👋
      </p>

      <div className="dashboard__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard__stat-card">
            <span className="dashboard__stat-icon">{stat.icon}</span>
            <div>
              <p className="dashboard__stat-value">{stat.value}</p>
              <p className="dashboard__stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2>{t("dashboard.overview")}</h2>
          <Link to={ROUTES.PRODUCTS} className="dashboard__view-all">
            {t("products.title")} →
          </Link>
        </div>
        <div className="dashboard__products-grid">
          {data?.products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="dashboard__product-item"
            >
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <p className="dashboard__product-title">{product.title}</p>
                <p className="dashboard__product-price">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
