'use client'

import { usePullToRefresh } from './test'
import styles from './page.module.css'

import { Loader } from './svg'
import { useEffect, useRef } from 'react'

const MAXIMUM_PULL_LENGTH = 240
type Props = {
  children: React.ReactNode
}

export function PageRefresh({ children }: Props) {
  // const ref = useRef(null)

  const { isRefreshing, pullPosition, ref } = usePullToRefresh({
    // you can choose what behavior for `onRefresh`, could be calling an API to load more data, or refresh whole page.
    onRefresh: () => {
      window.location.reload()
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: 150,
    isDisabled: false,
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div ref={ref}>
      <div
        style={{
          // top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
          opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
          height: pullPosition / 3,
        }}
        className={styles.loaderWrapper}
        // className="bg-base-100 fixed inset-x-1/2 z-30 h-8 w-8 -translate-x-1/2 rounded-full p-2 shadow"
      >
        <Loader pullPosition={pullPosition} className={styles.loaderComponent} />
      </div>
      {children}
    </div>
  )
}
