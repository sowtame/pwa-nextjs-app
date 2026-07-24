'use client'

import { useEffect } from 'react'

export const SetupWorker = () => {
  useEffect(() => {
    // navigator.serviceWorker есть только в secure context (HTTPS или localhost);
    // при открытии по LAN-адресу http://192.168.x.x он undefined.
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker unavailable: not a secure context (open via HTTPS or localhost)')
      return
    }

    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
      .catch((err) => console.log('Service Worker registration failed:', err))
  }, [])

  return null
}
