const { colors } = require('./src/styles/theme.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        serif: ['Lastik', 'serif'],
        sans: ['Geist', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        semibold: '600',
      },
      fontSize: {
        'xs': ['0.9375rem', {
          lineHeight: '1.25',
          letterSpacing: '-0.01em',
        }],
        'base': ['1.0625rem', {
          lineHeight: '1.56',
          letterSpacing: '-0.01em',
        }],
        'lg': ['1.25rem', {
          lineHeight: '1.75',
          letterSpacing: '-0.01em',
        }],
        'xl': ['1.5rem', {
          lineHeight: '1.3',
          letterSpacing: '-0.02em',
        }],
        '2xl': ['2rem', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function({ addBase, addComponents, theme }) {
      addBase({
        'h1': {
          fontSize: theme('fontSize.2xl[0]'),
          lineHeight: theme('fontSize.2xl[1].lineHeight'),
          letterSpacing: theme('fontSize.2xl[1].letterSpacing'),
          fontFamily: theme('fontFamily.serif'),
          fontWeight: theme('fontWeight.semibold'),
          marginBottom: theme('spacing.8'),
        },
        'h2': {
          fontSize: theme('fontSize.xl[0]'),
          lineHeight: theme('fontSize.xl[1].lineHeight'),
          letterSpacing: theme('fontSize.xl[1].letterSpacing'),
          fontFamily: theme('fontFamily.serif'),
          fontWeight: theme('fontWeight.semibold'),
          marginBottom: theme('spacing.6'),
        },
        'h3': {
          fontSize: theme('fontSize.xl[0]'),
          lineHeight: theme('fontSize.xl[1].lineHeight'),
          letterSpacing: theme('fontSize.xl[1].letterSpacing'),
          fontFamily: theme('fontFamily.serif'),
          fontWeight: theme('fontWeight.regular'),
          marginBottom: theme('spacing.4'),
        },
        'p': {
          fontSize: theme('fontSize.base[0]'),
          lineHeight: theme('fontSize.base[1].lineHeight'),
          letterSpacing: theme('fontSize.base[1].letterSpacing'),
          fontFamily: theme('fontFamily.sans'),
          fontWeight: theme('fontWeight.regular'),
          marginBottom: theme('spacing.3'),
        }
      });

      addComponents({
        '.p-large': {
          fontSize: theme('fontSize.lg[0]'),
          lineHeight: theme('fontSize.lg[1].lineHeight'),
          letterSpacing: theme('fontSize.lg[1].letterSpacing'),
          fontFamily: theme('fontFamily.serif'),
          marginBottom: theme('spacing.3'),
        },
      });
    }
  ],
};
