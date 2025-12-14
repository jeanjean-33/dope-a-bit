import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Le nom du dépôt GitHub (modifiez si votre repo a un nom différent)
const REPO_NAME = 'dope-a-bit'

// Détecter si on est sur Vercel (Vercel définit VERCEL=1)
const isVercel = process.env.VERCEL === '1'
// Détecter si on est sur GitHub Pages (via variable d'environnement)
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  // Sur Vercel, utiliser '/' comme base path
  // Sur GitHub Pages, utiliser le nom du repo
  // En développement, toujours utiliser '/'
  base: process.env.NODE_ENV === 'production' && isGitHubPages ? `/${REPO_NAME}/` : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

