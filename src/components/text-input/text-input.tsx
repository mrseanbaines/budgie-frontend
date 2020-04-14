import React from 'react'

import * as s from './text-input.styles'

interface Props {
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<Props> = ({ placeholder, onChange }) => (
  <s.Input type='text' onChange={onChange} placeholder={placeholder} />
)

export default TextInput
