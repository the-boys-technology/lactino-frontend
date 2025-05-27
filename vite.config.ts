import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  optimizeDeps: {
    force: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://lactino-backend-render.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})