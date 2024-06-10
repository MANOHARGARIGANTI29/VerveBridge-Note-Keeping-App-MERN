import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

export default defineConfig({
  base: "/VerveBridge-Note-Keeping-App/",
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000 // Use the PORT environment variable or default to 3000
  }
})
