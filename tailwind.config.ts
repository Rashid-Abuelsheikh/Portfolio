import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)", raise: "var(--raise)", card: "var(--card)",
        ink: "var(--ink)", body: "var(--body)", dim: "var(--dim)",
        rule: "var(--rule)", soft: "var(--soft)",
        blue: "var(--blue)", amber: "var(--amber)", green: "var(--green)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
