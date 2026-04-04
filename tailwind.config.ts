import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B69E1",
        dark: "#1A1A2E",
        secondary: "#666666",
        card: "#F8F9FA",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        orbit: "orbit 20s linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(140px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(140px) rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
