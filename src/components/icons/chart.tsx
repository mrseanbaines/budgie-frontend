import React from 'react'

export interface Props {
  color?: string
}

const ChartIcon: React.FC<Props> = ({ color = '#000000' }) => (
  <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
    <g stroke={color} stroke-width='4' fill='none' fill-rule='evenodd'>
      <path
        d='M0.1626896,2.74924892 L10.4649294,14.2986162 L20.9780994,2.90290468 C17.8362005,1.01925589 14.2181623,0 10.44,0 C6.7669559,0 3.24467143,0.96311569 0.1626896,2.74924892 Z'
        transform='rotate(45 14.757 39.885)'
      />
      <path
        d='M6.89884948,0.75148503 C2.55872439,4.5358591 0,9.9768448 0,15.8378378 C0,26.966263 9.1714464,36 20.5,36 C31.8285536,36 41,26.966263 41,15.8378378 C41,10.0830191 38.5338303,4.73107959 34.3288386,0.95322771 L20.475147,15.8638004 L6.89884948,0.75148503 Z'
        transform='rotate(45 9.636 24.328)'
      />
    </g>
  </svg>
)

export default ChartIcon
