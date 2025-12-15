import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Le nom du dépôt GitHub (modifiez si votre repo a un nom différent)
const REPO_NAME = 'dope-a-bit'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

