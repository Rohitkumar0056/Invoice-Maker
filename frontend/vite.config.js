import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [
    react(),
    vue()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'dist', // Ensure this matches your Vercel configuration
    rollupOptions: {
      input: './index.html', // Explicitly specify the entry point
    },
  },
  server: {
    proxy: {
      '/send-pdf': 'http://localhost:4000',
      '/create-pdf': 'http://localhost:4000',
      '/fetch-pdf': 'http://localhost:4000',
    }
  }
})
