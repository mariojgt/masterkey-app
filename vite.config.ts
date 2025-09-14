
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Prefer dedicated dev proxy target, fall back to API base or localhost
  const target = env.VITE_DEV_PROXY_TARGET || env.VITE_API_BASE || 'http://localhost:8000'

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
          // Keep path as-is (no rewrite) since backend expects /api prefix
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log(`Proxying ${req.method} ${req.url} -> ${target}`)
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log(`Backend ${proxyRes.statusCode} for ${req.url}`)
            })
            proxy.on('error', (err, _req, _res) => {
              console.log('Proxy error:', err)
            })
          }
        }
      }
    }
  }
})
