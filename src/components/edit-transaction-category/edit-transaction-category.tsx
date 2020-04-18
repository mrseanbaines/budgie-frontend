import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getCategoryItems } from 'store/categories/selectors'
import { Category } from 'store/categories/types'
import { Transaction } from 'store/transactions/types'
import { updateTransaction } from 'store/transactions/actions'
import Popup from 'components/popup'
import { ListItem } from 'components/list'
import { ForwardIcon } from 'components/icons'
import theme from 'theme'

import * as s from './edit-transaction-category.styles'

export interface Props {
  onLeftButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickOutside?: (e: Event) => void
  onCategoryClick: (e?: React.MouseEvent<HTMLDivElement>) => void
  onCreateCategoryClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  transactionId: Transaction['id']
}

const EditTransactionCategory: React.FC<Props> = ({
  onLeftButtonClick,
  onClickOutside,
  onCategoryClick,
  transactionId,
  onCreateCategoryClick,
}) => {
  const categories = useSelector(getCategoryItems)
  const dispatch = useDispatch()

  const handleSetCategory = (categoryId: Category['id']) => {
    try {
      dispatch(updateTransaction(transactionId, categoryId))
    } catch (err) {
      console.error(err)
    } finally {
      onCategoryClick()
    }
  }

  return (
    <Popup
      title='Choose a Category'
      leftButton='back'
      onLeftButtonClick={onLeftButtonClick}
      onClickOutside={onClickOutside}
    >
      {categories.map(category => (
        <ListItem
          key={category.id}
          title={category.name}
          badgeColor={category.color}
          extra={<ForwardIcon color={theme.colors.icons.default} />}
          onClick={() => handleSetCategory(category.id)}
        />
      ))}

      <s.NewCategory onClick={onCreateCategoryClick}>New Category</s.NewCategory>
    </Popup>
  )
}

export default EditTransactionCategory
