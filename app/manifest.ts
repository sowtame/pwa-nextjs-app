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
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/192_192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/512_512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
