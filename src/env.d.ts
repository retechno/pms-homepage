/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL?: string
  readonly VITE_DEMO_ENDPOINT?: string
  readonly VITE_SALES_EMAIL?: string
  readonly VITE_PRIVACY_URL?: string
  readonly VITE_TERMS_URL?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
