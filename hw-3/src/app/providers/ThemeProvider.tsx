import { useEffect } from "react";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "@/features/settings";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
