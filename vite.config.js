import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer';
import rawPlugin from 'vite-plugin-raw';

export default defineConfig({
  plugins: [
    rawPlugin({
      match: /\.md$/,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'global': 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});