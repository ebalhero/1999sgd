import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function githubPagesRootSyncPlugin() {
  return {
    name: 'github-pages-root-sync',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Ensure Vite dev and build always compile from /src/main.jsx
        if (html.includes('./assets/app.js')) {
          return html
            .replace(/<link rel="stylesheet"[^>]*href="\.\/assets\/app\.css"[^>]*>\s*/g, '')
            .replace(
              /<script type="module"[^>]*src="\.\/assets\/app\.js"[^>]*><\/script>/g,
              '<script type="module" src="/src/main.jsx"></script>'
            );
        }
        return html;
      },
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const rootAssetsDir = path.resolve(__dirname, 'assets');
      const distAssetsDir = path.resolve(distDir, 'assets');
      if (fs.existsSync(distAssetsDir)) {
        fs.mkdirSync(rootAssetsDir, { recursive: true });
        for (const f of fs.readdirSync(distAssetsDir)) {
          fs.copyFileSync(path.join(distAssetsDir, f), path.join(rootAssetsDir, f));
        }
      }
      const distIndex = path.resolve(distDir, 'index.html');
      if (fs.existsSync(distIndex)) {
        fs.copyFileSync(distIndex, path.resolve(__dirname, 'index.html'));
      }
      const srcSg = path.resolve(__dirname, 'public/images/sg');
      const dstSg = path.resolve(__dirname, 'images/sg');
      if (fs.existsSync(srcSg)) {
        fs.mkdirSync(dstSg, { recursive: true });
        for (const f of fs.readdirSync(srcSg)) {
          fs.copyFileSync(path.join(srcSg, f), path.join(dstSg, f));
        }
      }
      const srcMy = path.resolve(__dirname, 'public/images/my');
      const dstMy = path.resolve(__dirname, 'images/my');
      if (fs.existsSync(srcMy)) {
        fs.mkdirSync(dstMy, { recursive: true });
        for (const f of fs.readdirSync(srcMy)) {
          fs.copyFileSync(path.join(srcMy, f), path.join(dstMy, f));
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [githubPagesRootSyncPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/app.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
