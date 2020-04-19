import React from 'react'
import Popup from 'components/popup'
import { colors } from 'theme'

import * as s from './edit-category-color.styles'

interface Props {
  onLeftButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickOutside?: (e: Event) => void
  currentColor: string
  setCategoryColor: React.Dispatch<React.SetStateAction<string>>
}

const EditCategoryColor: React.FC<Props> = ({ onLeftButtonClick, onClickOutside, currentColor, setCategoryColor }) => (
  <Popup onClickOutside={onClickOutside} title='Pick a Color' leftButton='back' onLeftButtonClick={onLeftButtonClick}>
    <s.Wrapper>
      {colors.categories.map(color => (
        <s.CategoryColor color={color} selected={color === currentColor} onClick={() => setCategoryColor(color)} />
      ))}
    </s.Wrapper>
  </Popup>
)

export default EditCategoryColor
