import { useTranslation } from "react-i18next";
import { StoreProvider } from "./providers/StoreProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AppRouter } from "./router/AppRouter";
import { ErrorBoundary } from "@/widgets/ErrorBoundary/ErrorBoundary";
import { useAuthInit } from "./hooks/useAuthInit";
import "./styles/global.css";

function AppContent() {
  useAuthInit();

  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <ErrorBoundary
      fallbackTitle={t("errors.boundary")}
      fallbackMessage={t("errors.boundaryMessage")}
      fallbackRetry={t("errors.retry")}
    >
      {children}
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <StoreProvider>
      <ErrorBoundaryWrapper>
        <AppContent />
      </ErrorBoundaryWrapper>
    </StoreProvider>
  );
}
