import React from 'react'

export interface Props {
  color?: string
}

const PlusIcon: React.FC<Props> = ({ color = '#000000' }) => (
  <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
    <g transform='translate(9 9)' fill={color} fillRule='nonzero'>
      <rect y='14' width='32' height='4' rx='2' />
      <rect transform='rotate(90 16 16)' y='14' width='32' height='4' rx='2' />
    </g>
  </svg>
)

export default PlusIcon
