import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default {
  plugins: [vue()],
  build: { target: 'esnext' },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  optimizeDeps: {
    exclude: ['@livementor/mikado_reborn']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
}
