import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'PWA DEV',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'https://web.alfabank.ru/mobile/s3/static/newclick/LogoPWA_192_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://web.alfabank.ru/mobile/s3/static/newclick/LogoPWA_512_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
