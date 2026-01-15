import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Copy fallback CSS to dist after build
    return {
      base: '/dermoClinic/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'copy-fallback-css',
          writeBundle() {
            const fallbackSrc = path.resolve(__dirname, 'src/fallback.css');
            const fallbackDest = path.resolve(__dirname, 'dist/src/fallback.css');
            if (existsSync(fallbackSrc)) {
              const destDir = path.dirname(fallbackDest);
              if (!existsSync(destDir)) {
                mkdirSync(destDir, { recursive: true });
              }
              copyFileSync(fallbackSrc, fallbackDest);
            }
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
