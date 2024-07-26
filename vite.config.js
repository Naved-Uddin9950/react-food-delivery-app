import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

const app = process.env.VITE_APP_NAME;
// const app = 'Tandoori Pizza';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: app,
        short_name: app,
        theme_color: '#ffffff',
        icons: [
          {
            src: 'images/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'images/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
      screenshots: [
        {
          src: 'images/screenshot-wide.png',
          sizes: '1366x609',
          type: 'image/png',
          form_factor: 'wide',
        },
        {
          src: 'images/screenshot-large.png',
          sizes: '1081x2401',
          type: 'image/png',
          form_factor: 'square',
        },
      ],
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
});
