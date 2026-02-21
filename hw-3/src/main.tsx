import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/lib/i18n/i18n";
import { App } from "@/app/index";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
