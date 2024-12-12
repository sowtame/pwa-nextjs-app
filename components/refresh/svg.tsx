import { useMemo } from 'react'
import cn from 'classnames'
import styles from './page.module.css'

type LineT = {
  deg: number
  opacity: number
}

const allLines = [
  {
    deg: 0,
  },
  {
    deg: 45,
  },
  {
    deg: 90,
  },
  {
    deg: 135,
  },
  {
    deg: 180,
  },
  {
    deg: 220,
  },
  {
    deg: 270,
  },
  {
    deg: 315,
  },
]

const getRowLineStyle = ({ deg, opacity }: LineT) => {
  return {
    opacity: opacity >= 1 ? 1 : opacity,
    transform: `rotate(${deg}deg)`,
  }
}

type Props = {
  className: string
  pullPosition: number
  isRefreshing: boolean
}

export const Loader = ({ className, pullPosition, isRefreshing }: Props) => {
  const opacityComputed = pullPosition / 2 / 10
  console.log('🚀 ~ Loader ~ pullPosition1:', opacityComputed)
  const lines = useMemo(() => {
    return allLines.map(({ deg }, index) => {
      return {
        deg,
        opacity: Math.min(1, Math.max(0, opacityComputed - index * 0.36)),
      }
    })
  }, [opacityComputed])

  return (
    <svg
      focusable="false"
      viewBox="0 0 35 35"
      width="35"
      height="35"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#676567"
      strokeWidth="3.5"
      className={cn(className, {
        [styles.reloading]: isRefreshing,
      })}
    >
      <g transform="translate(17.5 17.5)">
        {lines.map(({ deg, opacity }) => {
          return (
            <g strokeLinecap="round" key={deg}>
              <line
                y1="7"
                y2="13"
                className={cn({ [styles.lineReloading]: isRefreshing })}
                style={getRowLineStyle({ deg, opacity: isRefreshing ? 1 : opacity })}
              ></line>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
