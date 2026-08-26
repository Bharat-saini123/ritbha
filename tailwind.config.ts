import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:       "#0B0F1A",   // deep navy-black
        surface:  "#111827",   // dark slate
        surface2: "#1a2235",   // slightly lighter slate
        accent:   "#818cf8",   // soft electric indigo
        accent2:  "#c084fc",   // violet highlight
        clay:     "#fb7185",   // rose for errors
        ink:      "#f1f5f9",   // near-white
        muted:    "#64748b",   // slate-500
        line:     "rgba(129,140,248,0.15)", // indigo-tinted border
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body:    ["var(--font-inter)", "sans-serif"],
        mono:    ["var(--font-jbmono)", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
