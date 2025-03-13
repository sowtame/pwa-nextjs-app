import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'PWA DEV',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#EF3124',
    theme_color: '#000000',
    icons: [
      {
        src: './LogoPWA_192_192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
