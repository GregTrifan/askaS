/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      /*  {
        light: {
          primary: "#93BBFB",
          "primary-content": "#212638",
          secondary: "#DAE8FF",
          "secondary-content": "#212638",
          accent: "#93BBFB",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#DAE8FF",
          "base-content": "#212638",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      }, */
      {
        dark: {
          primary: "#38FF26",
          "primary-content": "#F9FBFF",
          secondary: "#D4FFAE",
          "secondary-content": "#F9FBFF",
          accent: "#00FF5E",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#202020",
          "base-100": "#2E2E2E",
          "base-200": "#2A2A2A",
          "base-300": "#1E1E1E",
          "base-content": "#F9FBFF",
          info: "#85FFF8",
          success: "#38FF26",
          warning: "#F2FF01",
          error: "#FF006B",

          "--rounded-btn": "9999rem",
          ".btn-primary": {
            color: "black",
          },
          ".btn-warning": {
            color: "black",
          },
          ".btn-error": {
            color: "black",
          },
          ".btn-success": {
            color: "black",
          },
          ".btn-secondary": {
            color: "black",
          },
          ".btn-info": {
            color: "black",
          },
          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
