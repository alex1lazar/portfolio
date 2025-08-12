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
        // Add the new color palette as Tailwind classes
        'text-muted': '#6D5950',
        'text-dark': '#4E220F',
        'text-normal': '#3D2F28',
        'text-accent': '#D64A0E',
        'color-accent': '#D64A0E',
        'bg-accent': '#D64A0E',
      },
      fontFamily: {
        serif: ['Lastik', 'serif'],
        sans: ['Geist', 'sans-serif'],
      },
      fontSize: {
        'base': ['1rem', {
          lineHeight: '1.5',
          letterSpacing: '-0.01em',
        }],
        'lg': ['1.25rem', {
          lineHeight: '1.4',
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
          fontWeight: theme('fontWeight.bold'),
          marginBottom: theme('spacing.8'),
        },
        'h2': {
          fontSize: theme('fontSize.xl[0]'),
          lineHeight: theme('fontSize.xl[1].lineHeight'),
          letterSpacing: theme('fontSize.xl[1].letterSpacing'),
          fontFamily: theme('fontFamily.serif'),
          fontWeight: theme('fontWeight.bold'),
          marginBottom: theme('spacing.6'),
        },
        'h3': {
          fontSize: theme('fontSize.xl[0]'),
          lineHeight: theme('fontSize.xl[1].lineHeight'),
          letterSpacing: theme('fontSize.xl[1].letterSpacing'),
          fontFamily: theme('fontFamily.serif'),
          fontWeight: theme('fontWeight.bold'),
          marginBottom: theme('spacing.4'),
        },
        'p': {
          fontSize: theme('fontSize.base[0]'),
          lineHeight: theme('fontSize.base[1].lineHeight'),
          letterSpacing: theme('fontSize.base[1].letterSpacing'),
          marginBottom: theme('spacing.4'),
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
}

