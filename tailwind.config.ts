import type { Config } from "tailwindcss";

export default {
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
      },
      fontFamily: {
        hilmar: ["var(--font-hilmar)"],
      },
      keyframes: {
        moving_text: {
          "0%": { transform: "translateX(2%)" },
          "50%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(2%)" },
        },
      },
      animation: {
        moving_text: "moving_text 5s linear  infinite",
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
} satisfies Config;
