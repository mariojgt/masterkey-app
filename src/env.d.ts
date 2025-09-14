/// <reference types="vite/client" />

// Augment Vite's env with our custom variables
interface ImportMetaEnv {
  readonly VITE_API_BASE?: string
  readonly VITE_DIRECT_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
