import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lotus: {
          50: "#fff7f3",
          100: "#ffe8dc",
          500: "#c84c2b",
          700: "#87351f"
        },
        indigoInk: "#26324d",
        turmeric: "#d99b2b",
        leaf: "#2f6f57",
        river: "#2f6f8f"
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(38, 50, 77, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
