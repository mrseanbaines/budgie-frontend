import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListItem, ListHeading } from 'components/list'
import { getCategoryItems } from 'store/categories/selectors'
import { setSelectedCategoryId } from 'store/view/actions'
import { getSelectedCategoryId } from 'store/view/selectors'
import { Category } from 'store/categories/types'

import * as s from './filters.styles'

const Filters: React.FC = () => {
  const categories = useSelector(getCategoryItems)
  const selectedCategoryId = useSelector(getSelectedCategoryId)
  const dispatch = useDispatch()

  const handleSelectCategory = (id: Category['id']) => {
    if (id === selectedCategoryId) {
      dispatch(setSelectedCategoryId(null))
    } else {
      dispatch(setSelectedCategoryId(id))
    }
  }

  return (
    <s.Wrapper>
      <ListHeading title='Categories' />

      {categories.map(category => (
        <ListItem
          key={category.id}
          title={category.name}
          badgeColor={category.color}
          onClick={() => handleSelectCategory(category.id)}
          highlight={category.id === selectedCategoryId}
        />
      ))}
    </s.Wrapper>
  )
}

export default Filters
