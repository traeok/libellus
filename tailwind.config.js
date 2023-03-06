/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'invert-md': [
          '0 4px 6px -1px rgba(255, 255, 255, 0.08)',
          '0 2px 4px -2px rgba(255, 255, 255, 0.08)'
        ],
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
