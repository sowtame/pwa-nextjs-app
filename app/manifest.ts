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
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/36_36.png',
        sizes: '36x36',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/48_48.png',
        sizes: '48x48',
        type: 'image/png',
        density: 1,
        purpose: 'maskable',
      },
      {
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/72_72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/96_96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://alfaonline.servicecdn.ru/public/s3/static/newclick/pwa/icons/android/144_144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'maskable',
      },
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
