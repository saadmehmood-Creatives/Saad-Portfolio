/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Deep Black
        foreground: "#ffffff", // Pure White
        accent: "#FFD700", // Cinematic Yellow
        "accent-dark": "#B8860B", // Darker Yellow for depth
        "surface": "#111111", // Slightly lighter black for cards
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
}

