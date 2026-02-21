import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/widgets/Layout/Layout";
import { Loader } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage/DashboardPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage/ProductsPage"));
const ProductDetailPage = lazy(
  () => import("@/pages/ProductDetailPage/ProductDetailPage"),
);
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage/SettingsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"));
const LogoutPage = lazy(() => import("@/pages/LogoutPage/LogoutPage"));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullPage />}>
        <Routes>
          {/* Публичные пути */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>

          {/* Защищенные пути */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
              <Route
                path={ROUTES.PRODUCT_DETAIL}
                element={<ProductDetailPage />}
              />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            </Route>
            <Route path={ROUTES.LOGOUT} element={<LogoutPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
