import React from 'react'

import * as s from './text-input.styles'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  currency?: boolean
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(({ currency, ...props }, ref) => (
  <s.InputWrapper>
    {currency && <span>£</span>}

    <s.Input currency={currency} ref={ref} {...props} />
  </s.InputWrapper>
))

export default TextInput
