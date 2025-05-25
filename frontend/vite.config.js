import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 8080서버로 api 요청
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
