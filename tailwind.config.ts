import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'paper': '#ffffff',
        'ink': '#111111',
        'pencil': '#999999',
        'redline': '#e11d48',
        'redline-wash': '#fff1f2',
        'rule': '#e5e5e5',
        'bleed': '#f5f5f5',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        heading: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        annotation: ['"Caveat"', 'cursive'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '400' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '400' }],
        'heading': ['1.625rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body': ['1.0625rem', { lineHeight: '1.75', fontWeight: '400' }],
        'ui': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '400' }],
        'annotation': ['1rem', { lineHeight: '1.3', fontWeight: '400' }],
      },
      maxWidth: {
        'prose': '640px',
        'content': '1080px',
      },
    },
  },
  plugins: [],
} satisfies Config;
