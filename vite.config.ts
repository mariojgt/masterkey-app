
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log(`Proxying ${req.method} ${req.url} to http://localhost:8000`)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(`Received ${proxyRes.statusCode} from backend for ${req.url}`)
          })
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err)
          })
        }
      }
    }
  }
})
