'use client'

import React, { useEffect, useState } from 'react'

type Props = {}

export const SetupWorker = ({}: Props) => {
  const [first, setFirst] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setFirst(true)
    }, 1000)

    console.log(2)

    const test = async () => {
      const wakeLock = await navigator.wakeLock.request('screen')

      setTimeout(() => {
        wakeLock.release()
      }, 2000)

      wakeLock.addEventListener('release', () => {
        console.log('clear')
      })
    }

    test()

    // if ('serviceWorker' in navigator) {
    //   registerServiceWorker()
    // }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    // const sub = await registration.pushManager.getSubscription()
  }

  if (first) {
    return <div>auth</div>
  }

  return <div></div>
}
