'use client'

import { useRouter } from 'next/navigation'
import { usePullToRefresh } from './test'
import styles from './page.module.css'

import { Loader } from './svg'

const MAXIMUM_PULL_LENGTH = 240

export default function PageRefresh() {
  const { refresh } = useRouter()

  const { isRefreshing, pullPosition } = usePullToRefresh({
    // you can choose what behavior for `onRefresh`, could be calling an API to load more data, or refresh whole page.
    onRefresh: () => {
      console.log(1)
      window.location.reload()
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: 50,
    isDisabled: false,
  })

  return (
    <div>
      <div
        style={{
          // top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
          opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
          height: pullPosition / 3,
        }}
        className={styles.loaderWrapper}
        // className="bg-base-100 fixed inset-x-1/2 z-30 h-8 w-8 -translate-x-1/2 rounded-full p-2 shadow"
      >
        <div
          className={styles.loader}
          // className={`h-full w-full ${isRefreshing ? 'animate-spin' : ''}`}
          // style={!isRefreshing ? { transform: `rotate(${pullPosition}deg)` } : {}}
        >
          <Loader className={styles.loaderComponent} />
        </div>
      </div>
    </div>
  )
}
