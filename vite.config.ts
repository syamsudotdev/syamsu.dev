import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import postcss from '@tailwindcss/postcss';

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcss],
    },
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: false,
      },
    }),
    react(),
  ],
  preview: {
    allowedHosts: true,
  },
});
