import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default {
  build:{
    target: 'esnext'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
}
