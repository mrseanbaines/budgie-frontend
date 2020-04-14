import React from 'react'

export interface Props {
  color?: string
}

const StackIcon: React.FC<Props> = ({ color = '#000000' }) => (
  <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
    <g transform='translate(1 7)' fill='none' fill-rule='evenodd'>
      <path
        d='M30.7101213,26 C29.8495721,28.8914889 27.1710206,31 24,31 C20.8289794,31 18.1504279,28.8914889 17.2898787,26 L2,26 L2,36 L46,36 L46,26 L30.7101213,26 Z'
        stroke={color}
        stroke-width='4'
      />
      <rect fill={color} fill-rule='nonzero' y='16' width='48' height='4' rx='2' />
      <rect fill={color} fill-rule='nonzero' y='8' width='48' height='4' rx='2' />
      <rect fill={color} fill-rule='nonzero' width='48' height='4' rx='2' />
    </g>
  </svg>
)

export default StackIcon
