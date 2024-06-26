import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/': {
        target: 'https://expense-tracker-two-weld.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace('/^\//', '')
      }
    }
  },
  plugins: [react()],
})
