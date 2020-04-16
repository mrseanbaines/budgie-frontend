import React from 'react'

export interface Props {
  color?: string
}

const UserIcon: React.FC<Props> = ({ color = '#000000' }) => (
  <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
    <g transform='translate(3 3)' fill='none' fillRule='evenodd'>
      <circle stroke={color} strokeWidth='4' cx='22' cy='22' r='22' />
      <path
        d='M22.18 28c7.303 0 13.69 4.01 17.182 10h-4.42c-2.999-3.825-7.601-6.273-12.761-6.273-5.16 0-9.762 2.448-12.761 6.273H5c3.491-5.99 9.88-10 17.18-10z'
        fill={color}
        fillRule='nonzero'
      />
      <circle stroke={color} strokeWidth='4' cx='22' cy='20' r='8' />
    </g>
  </svg>
)

export default UserIcon
