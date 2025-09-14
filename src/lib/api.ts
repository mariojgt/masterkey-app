
// API configuration using native fetch with proxy support and Capacitor HTTP for native
import { Capacitor, CapacitorHttp } from '@capacitor/core'
const DEV = (import.meta as any).env.DEV
const DIRECT_API = (import.meta as any).env.VITE_DIRECT_API === 'true'
// In dev, default to proxy unless explicitly overridden with VITE_DIRECT_API=true
let API_BASE = DEV && !DIRECT_API ? '' : ((import.meta as any).env.VITE_API_BASE || '')
let authToken: string | null = null

// Native fetch API wrapper
export const api = {
  async get(url: string) {
    return this.request('GET', url)
  },

  async post(url: string, data?: any) {
    return this.request('POST', url, data)
  },

  async put(url: string, data?: any) {
    return this.request('PUT', url, data)
  },

  async delete(url: string) {
    return this.request('DELETE', url)
  },

  async request(method: string, url: string, data?: any) {
    // Ensure URL begins with /api for proxying and avoid double slashes
    const path = url.startsWith('http')
      ? url
      : (url.startsWith('/') ? url : `/${url}`)

    const apiPath = path.startsWith('/api') || path.startsWith('http')
      ? path
      : `/api${path}`

    const fullUrl = API_BASE
      ? (apiPath.startsWith('http') ? apiPath : joinUrl(API_BASE, apiPath))
      : apiPath // Use proxy if API_BASE is empty

    const headers: Record<string, string> = {
      // Keep Accept, but avoid forcing Content-Type for simple requests to reduce preflights
      'Accept': 'application/json',
    }

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    const config: RequestInit = {
      method,
      headers,
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'omit', // Don't send credentials
    }

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      // If sending FormData/Blob/etc, let the browser set Content-Type with proper boundary
      const isFormLike = (typeof FormData !== 'undefined' && data instanceof FormData) ||
                         (typeof Blob !== 'undefined' && data instanceof Blob)
      if (isFormLike) {
        config.body = data
      } else {
        headers['Content-Type'] = 'application/json'
        config.body = JSON.stringify(data)
      }
    }

    // Debug logging
    console.log('API Request:', {
      method,
      url,
      fullURL: fullUrl,
      headers,
      data,
      usingProxy: !API_BASE,
      platform: Capacitor.getPlatform()
    })

    try {
      // On native (ios/android), use CapacitorHttp to bypass CORS
      if (Capacitor.isNativePlatform()) {
        const httpHeaders: Record<string, string> = { ...headers }
        const isJson = headers['Content-Type'] === 'application/json'
        const dataPayload = isJson && config.body ? JSON.parse(config.body as string) : undefined
        const result = await CapacitorHttp.request({
          method: method as any,
          url: fullUrl,
          headers: httpHeaders,
          data: dataPayload,
        })

        const status = result.status
        const ok = status >= 200 && status < 300
        console.log('Native HTTP Response:', { status })
        if (!ok) {
          const err = new Error(`HTTP ${status}`)
          ;(err as any).body = result.data
          throw err
        }
        return { data: result.data }
      }

      // Web (browser): use fetch (proxy in dev avoids CORS)
      const response = await fetch(fullUrl, config)

      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url
      })

      if (!response.ok) {
        // Try to parse JSON error body, fallback to text
        let errorBody: any = null
        const ct = response.headers.get('content-type') || ''
        try {
          errorBody = ct.includes('application/json') ? await response.json() : await response.text()
        } catch (_) {
          // ignore
        }
        const err = new Error(`HTTP ${response.status}: ${response.statusText}`)
        ;(err as any).body = errorBody
        throw err
      }

      // Read as text then try to parse JSON (handles servers with wrong content-type)
      const raw = await response.text()
      try {
        const parsed = raw ? JSON.parse(raw) : null
        console.log('Response data:', parsed)
        return { data: parsed }
      } catch {
        console.log('Response text (non-JSON):', raw)
        return { data: raw }
      }
    } catch (error: any) {
      console.error('API Request Failed:', {
        message: error.message,
        stack: error.stack,
        url: fullUrl,
        method,
        data
      })
      throw error
    }
  }
}

export function setToken(token: string | null) {
  if (token) {
    authToken = token
    localStorage.setItem('token', token)
    console.log('Token set:', token)
  } else {
    authToken = null
    localStorage.removeItem('token')
    console.log('Token cleared')
  }
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function updateApiBaseUrl(baseUrl: string) {
  // Ensure the URL has a protocol
  let url = baseUrl.trim()
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url
  }
  API_BASE = url
  console.log('API base URL updated to:', url)
  return url
}

// Initialize token from localStorage
const t = getToken()
if (t) setToken(t)

// Helper to safely join base URL and path
function joinUrl(base: string, path: string) {
  if (!base) return path
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return `${b}${p}`
}
