/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        primary: colors.red,
        smoke: {
          darkest: "rgba(0, 0, 0, 0.9)",
          darker: "rgba(0, 0, 0, 0.75)",
          dark: "rgba(0, 0, 0, 0.6)",
          default: "rgba(0, 0, 0, 0.5)",
          light: "rgba(0, 0, 0, 0.4)",
          lighter: "rgba(0, 0, 0, 0.25)",
          lightest: "rgba(0, 0, 0, 0.1)",
        },
      },
      fontFamily: {
        title: 'Aboreto, Georgia, Cambria, "Times New Roman", Times, serif',
        body: 'RubikVariable, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
    },
  },
  plugins: [],
};
