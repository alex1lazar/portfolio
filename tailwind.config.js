const { colors } = require('./src/styles/theme.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
}

