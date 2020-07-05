import React from 'react'
import { useSelector } from 'react-redux'

import { ListItem } from 'components/list'
import { getCategoryItems } from 'store/categories/selectors'
import { Transaction } from 'store/transactions/types'
import { ForwardIcon } from 'icons'
import * as sc from 'styles/common'

export interface Props {
  onCategoryClick: (categoryId: Transaction['category']) => any
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

      <ListItem title='Uncategorised' extra={<ForwardIcon />} onClick={() => onCategoryClick(null)} />

      <hr />

      <sc.TextButton onClick={onCreateCategoryClick}>New Category</sc.TextButton>
    </>
  )
}

export default ChooseCategory
