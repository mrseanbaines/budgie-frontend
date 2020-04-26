import React from 'react'
import { useSelector } from 'react-redux'

import { ListItem } from 'components/list'
import { getCategoryItems } from 'store/categories/selectors'
import { ReactComponent as ForwardIcon } from 'icons/forward.svg'

import * as s from './choose-category.styles'

export interface Props {
  onCategoryClick: (categoryId: string) => any
  onCreateCategoryClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const ChooseCategory: React.FC<Props> = ({ onCategoryClick, onCreateCategoryClick }) => {
  const categories = useSelector(getCategoryItems)

  return (
    <>
      {categories.map(category => (
        <ListItem
          key={category.id}
          title={category.name}
          badgeColor={category.color}
          extra={<ForwardIcon />}
          onClick={() => onCategoryClick(category.id)}
        />
      ))}

      <s.NewCategory onClick={onCreateCategoryClick}>New Category</s.NewCategory>
    </>
  )
}

export default ChooseCategory
