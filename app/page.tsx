'use client'

import Image from 'next/image'
import styles from './page.module.css'
// import { BottomSheet } from '@alfalab/core-components/bottom-sheet'
import { SetupWorker } from '../components/setup-worker'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => console.log('Service Worker registration successful with scope: ', registration.scope))
      .catch((err) => console.log('Service Worker registration failed: ', err))
  }, [])
  return (
    <div className={styles.page}>
      <SetupWorker />
      <div className={styles.navBar}>navbar</div>
      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <a href="https://private.stepantest.ru/">private.stepantest</a>

        <div className={styles.ctas}>
          <div style={{ display: 'flex' }}>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className={styles.logo} src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
              Deploy now
            </a>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className={styles.logo} src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
              Deploy now
            </a>
          </div>

          <Link className={styles.secondary} href={'/refresh'}>
            Refresh page
          </Link>
          <Link className={styles.secondary} href={'/login'}>
            Login page
          </Link>
        </div>
        {/* <BottomSheet hideOverlay={true} open={true} onClose={() => {}}>
          <div style={{ height: '430px' }}></div>
        </BottomSheet> */}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
