import React from 'react'

export interface Props {
  color?: string
}

const ChartIcon: React.FC<Props> = ({ color = '#000000' }) => (
  <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
    <g transform='translate(3 6)' fill='none' fill-rule='evenodd'>
      <rect stroke={color} stroke-width='4' y='4.105' width='44' height='33.895' rx='2' />
      <path
        stroke={color}
        stroke-width='4'
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M2.174 16.842L41.826 16.842'
      />
      <path
        stroke={color}
        stroke-width='4'
        stroke-linecap='round'
        stroke-linejoin='round'
        transform='rotate(-90 13.13 8.421)'
        d='M5.236 8.421L21.025 8.421'
      />
      <path
        stroke={color}
        stroke-width='4'
        stroke-linecap='round'
        stroke-linejoin='round'
        transform='rotate(-90 31.913 8.421)'
        d='M24.018 8.421L39.808 8.421'
      />
      <g transform='translate(11.565 21.053)' fill={color} fill-rule='nonzero'>
        <ellipse cx='2.087' cy='2.105' rx='2.087' ry='2.105' />
        <ellipse cx='2.087' cy='10.526' rx='2.087' ry='2.105' />
        <ellipse cx='10.435' cy='2.105' rx='2.087' ry='2.105' />
        <ellipse cx='10.435' cy='10.526' rx='2.087' ry='2.105' />
        <ellipse cx='18.783' cy='2.105' rx='2.087' ry='2.105' />
        <ellipse cx='18.783' cy='10.526' rx='2.087' ry='2.105' />
      </g>
    </g>
  </svg>
)

export default ChartIcon
