import React from 'react'

import * as s from './text-input.styles'

export type Props = React.InputHTMLAttributes<any>

const TextInput = React.forwardRef<HTMLInputElement, Props>(({ placeholder, ...props }, ref) => (
  <s.Input ref={ref} type='text' placeholder={placeholder} {...props} />
))

export default TextInput
