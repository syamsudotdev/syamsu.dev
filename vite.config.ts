import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer() as any],
    },
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  plugins: [
    tanstackRouter(),
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
