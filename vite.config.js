import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: './', // Set the base path for GitHub Pages subfolder hosting to use relative paths
  server: {
    compress: true,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          buildDate: new Date().toLocaleDateString('fr-BE'),
        },
      },
    }),
  ],
  root: 'LandingPage',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'LandingPage/index.html'),
    },
    minify: 'terser',
  },
});
