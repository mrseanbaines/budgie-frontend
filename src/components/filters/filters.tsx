import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListItem, ListHeading } from 'components/list'
import TextInput from 'components/text-input'
import { getCategoryItems } from 'store/categories/selectors'
import { Category } from 'store/categories/types'
import { setSelectedCategoryId, setMinAmount, setMaxAmount } from 'store/view/actions'
import { getSelectedCategoryId, getMinAmount, getMaxAmount } from 'store/view/selectors'

import * as s from './filters.styles'

const Filters: React.FC = () => {
  const categories = useSelector(getCategoryItems)
  const selectedCategoryId = useSelector(getSelectedCategoryId)
  const minAmount = useSelector(getMinAmount)
  const maxAmount = useSelector(getMaxAmount)
  const dispatch = useDispatch()

  console.log(minAmount, maxAmount)

  const handleSelectCategory = (id: Category['id']) => {
    if (id === selectedCategoryId) {
      dispatch(setSelectedCategoryId(null))
    } else {
      dispatch(setSelectedCategoryId(id))
    }
  }

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    const handlers = {
      min: setMinAmount,
      max: setMaxAmount,
    }

    if (name in handlers && Number.isInteger(Number(value))) {
      dispatch(handlers[name as keyof typeof handlers](Number(value)))
    }
  }

  return (
    <s.Wrapper>
      <div>
        <ListHeading title='Amount' />

        <s.Amount>
          <TextInput name='min' placeholder='Min' currency value={minAmount || ''} onChange={handleAmountInput} />

          <TextInput name='max' placeholder='Max' currency value={maxAmount || ''} onChange={handleAmountInput} />
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
