import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.html'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
