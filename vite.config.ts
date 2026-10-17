import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-resume-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = req.url ? req.url.split('?')[0] : ''
          if (pathname === '/resume.pdf' || pathname === '/Muhammad_Jawad_Fareed_Resume.pdf') {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename="Muhammad_Jawad_Fareed_Resume.pdf"')
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/recharts')) {
            return 'vendor-recharts'
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix'
          }
        },
      },
    },
  },
})
