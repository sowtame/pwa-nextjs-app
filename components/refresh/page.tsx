'use client'

import { usePullToRefresh } from './use-pull-to-refresh'
import styles from './page.module.css'

import { Loader } from './svg'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const MAXIMUM_PULL_LENGTH = 240
// const REFRESH_THRESHOLD = 180

type Props = {
  children: React.ReactNode
}

let timeoutId: NodeJS.Timeout | null = null

export function PageRefresh({ children }: Props) {
  const router = useRouter()
  const { isRefreshing, pullPosition, ref } = usePullToRefresh({
    onRefresh: () => {
      window.location.reload()
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: 150,
    isDisabled: false,
  })

  const computedPullPosiiton = pullPosition / 2

  const height = Math.min(65, Math.max(0, computedPullPosiiton))

  useEffect(() => {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        console.log('Browser tab is hidden')
        timeoutId = setTimeout(() => {
          console.log('logout')
          router.push('/login')
        }, 4000)
      } else {
        if (timeoutId) {
          console.log('cancel logout')
          clearTimeout(timeoutId)
        }
        console.log('Browser tab is visible')
      }
    })
  }, [])

  return (
    <div ref={ref}>
      <div
        style={{
          opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
          height,
          transition: isRefreshing ? 'height 0.35s ease-in-out' : '',
        }}
        className={styles.loaderWrapper}
      >
        <Loader pullPosition={computedPullPosiiton} className={styles.loaderComponent} isRefreshing={isRefreshing} />
      </div>
      {children}
    </div>
  )
}
