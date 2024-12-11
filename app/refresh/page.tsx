'use client'

import Image from 'next/image'
import styles from '../page.module.css'
import { SetupWorker } from '../../components/setup-worker'
import Link from 'next/link'

export default function Refresh() {
  return (
    <div className={styles.page}>
      <SetupWorker />
      <div className={styles.navBar}>navbar</div>
      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
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

          <Link className={styles.secondary} href={'/'}>
            Home page
          </Link>
        </div>
      </main>
    </div>
  )
}
