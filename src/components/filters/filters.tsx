import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListItem, ListHeading } from 'components/list'
import TextInput from 'components/text-input'
import { getCategoryItems } from 'store/categories/selectors'
import { Category } from 'store/categories/types'
import { setSelectedCategoryId } from 'store/view/actions'
import { getSelectedCategoryId } from 'store/view/selectors'

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
      <div>
        <ListHeading title='Amount' />

        <s.Amount>
          <TextInput placeholder='Min' currency />

          <TextInput placeholder='Max' currency />
        </s.Amount>
      </div>

      <div>
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
      </div>
    </s.Wrapper>
  )
}

export default Filters
