import React, { useRef, useEffect } from 'react'

import Popup from 'components/popup'
import TextInput from 'components/text-input'

import * as s from './create-category.styles'

interface Props {
  onLeftButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onEditColor?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickOutside?: (e: Event) => void
  handleCreateCategory: (e: any) => Promise<void>
  categoryColor: string
  currentName: string
  setCategoryName: React.Dispatch<React.SetStateAction<string>>
}

const CreateCategory: React.FC<Props> = ({
  onLeftButtonClick,
  onClickOutside,
  onEditColor,
  handleCreateCategory,
  categoryColor,
  setCategoryName,
  currentName,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  })

  return (
    <Popup
      onClickOutside={onClickOutside}
      title='Create a Category'
      leftButton='back'
      onLeftButtonClick={onLeftButtonClick}
    >
      <s.Wrapper>
        <s.CategoryColor onClick={onEditColor} color={categoryColor} />

        <form onSubmit={handleCreateCategory}>
          <TextInput
            ref={inputRef}
            placeholder='Enter a name'
            onChange={({ target: { value } }) => setCategoryName(value)}
            value={currentName}
            required
          />

          <s.CreateCategory onClick={handleCreateCategory}>Create Category</s.CreateCategory>
        </form>
      </s.Wrapper>
    </Popup>
  )
}

export default CreateCategory
