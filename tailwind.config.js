/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        coiny: ["Coiny", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "brand-russian-violet": "var(--russian-violet)",
        "brand-purple": "var(--purple)",
        "brand-dark-orchid": "var(--dark-orchid)",
        "brand-medium-orchid": "var(--medium-orchid)",
        "brand-indigo": "var(--indigo)",
        "brand-heliotrope": "var(--heliotrope)",
        "brand-background": "var(--clr-background)",
        "brand-light": "var(--clr-light)",
        "brand-light-green": "var(--clr-light-green)",
      },
      animation: {
        "pulse-slow": 'pulse 10s linear infinite',
      }
    },
    plugins: [],
  },
};
