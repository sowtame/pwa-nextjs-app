'use client'

import { usePullToRefresh } from './test'
import styles from './page.module.css'

import { Loader } from './svg'

const MAXIMUM_PULL_LENGTH = 240
const REFRESH_THRESHOLD = 180

type Props = {
  children: React.ReactNode
}

export function PageRefresh({ children }: Props) {
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

  return (
    <div ref={ref}>
      <div
        style={{
          opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
          height,
          // transition: 'height 0.35s ease-in-out',
        }}
        className={styles.loaderWrapper}
      >
        <Loader pullPosition={computedPullPosiiton} className={styles.loaderComponent} isRefreshing={isRefreshing} />
      </div>
      {children}
    </div>
  )
}
