'use client'

import styles from '../page.module.css'
import Link from 'next/link'

export default function Login() {
  return (
    <div className={styles.page}>
      <Link className={styles.secondary} href={'/'}>
        Home page
      </Link>
    </div>
  )
}
