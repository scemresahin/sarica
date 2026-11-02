import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages'te site https://scemresahin.github.io/sarica/ altında yayınlanır
export default defineConfig({
  base: '/sarica/',
  plugins: [react()],
})
