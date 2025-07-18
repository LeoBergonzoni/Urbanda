import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configurazione corretta per Netlify
export default defineConfig({
  base: './',
  plugins: [react()],
})