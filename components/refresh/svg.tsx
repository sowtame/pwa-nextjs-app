import { useMemo } from 'react'
import cn from 'classnames'
import styles from './page.module.css'

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

const getRowLineStyle = ({ deg, opacity }) => {
  return {
    opacity: opacity >= 1 ? 1 : opacity,
    transform: `rotate(${deg}deg)`,
  }
}

export const Loader = ({ className, pullPosition, isRefreshing }) => {
  console.log('🚀 h:', pullPosition)
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
        {/* <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 0 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 45 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 90 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 135 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 180 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 225 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 270 })}></line>
        </g>
        <g strokeLinecap="round">
          <line y1="7" y2="13" style={getRowLineStyle({ deg: 315 })}></line>
        </g> */}
        {/* <g strokeLinecap="round" style="--t-opacity: 0; --t-rotate: 0deg;">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity: 0; --t-rotate: 45deg;">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity: 0; --t-rotate: 90deg;">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity: 0; --t-rotate: 135deg;">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity: 0; --t-rotate: 180deg;">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity: 0; --t-rotate: 225deg;">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity:0;--t-rotate:270deg">
          <line y1="7" y2="13"></line>
        </g>
        <g strokeLinecap="round" style="--t-opacity:0;--t-rotate:315deg">
          <line y1="7" y2="13"></line>
        </g> */}
      </g>
    </svg>
  )
}
