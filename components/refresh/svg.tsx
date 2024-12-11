const getRowLineStyle = ({ deg }) => {
  return {
    opacity: 1,
    transform: `rotate(${deg}deg)`,
  }
}

export const Loader = ({ className, pullPosition }) => {
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
      className={className}
    >
      <g transform="translate(17.5 17.5)">
        <g strokeLinecap="round">
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
        </g>
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
