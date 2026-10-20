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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#eef8ff",
          100: "#d8eeff",
          200: "#b9e1fe",
          300: "#86cefd",
          400: "#4cb3fa",
          500: "#2294f2",
          600: "#0f76d9",
          700: "#0c5eb0",
          800: "#0e4f90",
          900: "#114275",
          950: "#0c2b4d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
