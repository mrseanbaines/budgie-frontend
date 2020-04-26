import React from 'react'

import { Category } from 'store/categories/types'
import { colors } from 'theme'

import * as s from './color-picker.styles'

export interface Props {
  currentColor: string
  onSetCategoryColor: (color: Category['color']) => void
}

const ColorPicker: React.FC<Props> = ({ currentColor, onSetCategoryColor }) => (
  <s.Wrapper>
    {colors.categories.map(color => (
      <s.CategoryColor
        key={color}
        color={color}
        selected={color === currentColor}
        onClick={() => onSetCategoryColor(color)}
      />
    ))}
  </s.Wrapper>
)

export default ColorPicker
