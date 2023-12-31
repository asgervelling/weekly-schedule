import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/globals.css",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stroke: "var(--color-stroke)",
        strokeLowContrast: "var(--color-stroke-low-contrast)",
        note1: "var(--color-note-1)",
        note2: "var(--color-note-2)",
        note3: "var(--color-note-3)",
        note4: "var(--color-note-4)",
      },
      textColor: {
        primary: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        inverted: "var(--color-text-inverted)",
      },
      backgroundColor: {
        fill: "var(--color-fill)",
        fillLowContrast: "var(--color-fill-low-contrast)",
        stroke: "var(--color-stroke)",
        strokeLowContrast: "var(--color-stroke-low-contrast)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
      borderWidth: {
        DEFAULT: "var(--border-width)",
      },
      borderColor: {
        DEFAULT: "var(--border-color)",
      },
    },
  },
  plugins: [],
};

export default config;
