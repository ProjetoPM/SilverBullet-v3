import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    compression(),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$ /, /\.(gz)$/]
    })
  ],
  server: {
    port: 5500
  },
  root: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600
  }
})
