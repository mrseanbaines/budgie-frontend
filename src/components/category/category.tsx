import React from 'react'

import TextInput from 'components/text-input'
import { useFocusInput } from 'hooks'

import * as s from './category.styles'

export interface Props {
  onEditColor: (e: React.MouseEvent<HTMLButtonElement>) => void
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  categoryColor: string
  currentName: string
  setCategoryName: React.Dispatch<React.SetStateAction<string>>
  submitText?: string
}

const Category: React.FC<Props> = props => {
  const inputRef = useFocusInput()

  return (
    <s.Wrapper>
      <s.CategoryColor onClick={props.onEditColor} color={props.categoryColor} />

      <form onSubmit={props.onFormSubmit}>
        <TextInput
          ref={inputRef}
          placeholder='Enter a name'
          onChange={({ target: { value } }) => props.setCategoryName(value)}
          value={props.currentName}
          required
        />

        {props.submitText && <s.Submit>{props.submitText}</s.Submit>}
      </form>
    </s.Wrapper>
  )
}

export default Category
