import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: env.PORT || 3000, // Usa el puerto de la variable de entorno o 3000 como fallback
    },
    preview: {
      port: env.PORT || 8080, // Configura el puerto para 'vite preview' en producción
    }
  }
})
