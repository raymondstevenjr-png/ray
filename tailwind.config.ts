import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "#0a1f44",
        gold: "#c9952a",
        "gold-light": "#e8b84b",
        "flag-green": "#1eb53a",
        "flag-blue": "#0072c6",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
