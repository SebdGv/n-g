// themes.js
export const themes = {
  home: {
    menuBarText: "#fabab5",
    menuOverlayBg: "#690700",
    menuOverlayText: "#fabab5",
    menuLinkHover: "#be6f6f",
  },
  vos22: {
    menuBarText: "rgb(202, 243, 202)",
    menuOverlayBg: "#1D4628",
    menuOverlayText: "rgb(202, 243, 202)",
    menuLinkHover: "rgb(103, 171, 103)",
  },
  rot23: {
    menuBarText: "#F2CA80",
    menuOverlayBg: "#BF6B04",
    menuOverlayText: "#F2CA80",
    menuLinkHover: "#FFC446",
  },
  contact: {
    menuBarText: "#fff",
    menuOverlayBg: "#a0a0a0",
    menuOverlayText: "#fff",
    menuLinkHover: "#333",
  },
};

// Mapping des routes vers les thèmes
export const routeThemeMap = {
  "/": "home",
  "/vos22": "vos22",
  "/rot23": "rot23",
  "/contact": "contact",
};

// Thème par défaut (fallback)
export const defaultTheme = "home";
