import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Site GitHub Pages üzerinden https://saricamuhendislik.com kök adresinde yayınlanır
export default defineConfig({
  base: '/',
  plugins: [react()],
})
