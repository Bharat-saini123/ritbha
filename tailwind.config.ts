import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0E2118",
        surface: "#15301F",
        surface2: "#1C3B27",
        accent: "#C9F169",
        clay: "#E8823C",
        ink: "#F4F6EE",
        muted: "#9FB79C",
        line: "rgba(201,241,105,0.14)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
