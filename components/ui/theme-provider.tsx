"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const themeVariants = ["default", "sage", "sunset"] as const;

type ThemeVariant = (typeof themeVariants)[number];

const ThemeVariantContext = React.createContext<{
  variant: ThemeVariant;
  setVariant: (value: ThemeVariant) => void;
}>({
  variant: "default",
  setVariant: () => {},
});

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [variant, setVariant] = React.useState<ThemeVariant>("default");

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme-variant");
    if (storedTheme && themeVariants.includes(storedTheme as ThemeVariant)) {
      setVariant(storedTheme as ThemeVariant);
    }
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    themeVariants.forEach((value) => root.classList.remove(`theme-${value}`));
    root.classList.add(`theme-${variant}`);
    window.localStorage.setItem("theme-variant", variant);
  }, [variant]);

  return (
    <NextThemesProvider {...props}>
      <ThemeVariantContext.Provider value={{ variant, setVariant }}>
        {children}
      </ThemeVariantContext.Provider>
    </NextThemesProvider>
  );
}

export function useThemeVariant() {
  return React.useContext(ThemeVariantContext);
}
