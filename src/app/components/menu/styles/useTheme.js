// useTheme.js
"use client";

import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultTheme, routeThemeMap, themes } from "./themes";

export function useTheme() {
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  // Détecter le changement de route et mettre à jour le thème
  useEffect(() => {
    const themeKey = routeThemeMap[pathname] || defaultTheme;
    setCurrentTheme(themeKey);

    // Animer la transition des couleurs
    gsap.to(":root", {
      duration: 0.6,
      ease: "power2.out",
      "--menu-bar-text": themes[themeKey].menuBarText,
      "--menu-overlay-bg": themes[themeKey].menuOverlayBg,
      "--menu-overlay-text": themes[themeKey].menuOverlayText,
      "--menu-link-hover": themes[themeKey].menuLinkHover,
    });
  }, [pathname]);

  return {
    themeName: currentTheme,
    themeValues: themes[currentTheme],
  };
}
