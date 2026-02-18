import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#68bbe3',
        'blue-grotto': '#0e86d4',
        'blue': '#055c9d',
        'navy-blue': '#003060',
        'off-white': '#f5f5f5',
      },
      fontFamily: {
        sans: [
          '"Helvetica Neue"',
          '"Arial"',
          'sans-serif',
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
