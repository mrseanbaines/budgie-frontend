import React from 'react'

export interface Props {
  color?: string
}

const ChartIcon: React.FC<Props> = ({ color = '#000000' }) => (
  <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
    <g stroke={color} strokeWidth='4' fill='none' fillRule='evenodd'>
      <g transform='translate(5 3)'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M0 5.312L4.848 5.312M18 5.312L39.818 5.312' />
        <ellipse cx='11' cy='4.857' rx='5' ry='4.857' />
      </g>
      <g transform='translate(5 37.286)'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M0 5.312L4.848 5.312M18 5.312L39.818 5.312' />
        <ellipse cx='11' cy='4.857' rx='5' ry='4.857' />
      </g>
      <g transform='matrix(-1 0 0 1 45 20.633)'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M0 5.312L4.848 5.312M18 5.312L39.818 5.312' />
        <ellipse cx='11' cy='4.857' rx='5' ry='4.857' />
      </g>
    </g>
  </svg>
)

export default ChartIcon
