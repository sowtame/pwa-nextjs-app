'use client'

import React, { useEffect } from 'react'

export const SetupWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
  }

  return <div></div>
}
