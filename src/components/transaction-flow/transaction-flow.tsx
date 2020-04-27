import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Transaction from 'components/transaction'
import ChooseCategory from 'components/choose-category'
import ColorPicker from 'components/color-picker'
import Category from 'components/category'
import Popup from 'components/popup'
import { createCategory } from 'store/categories/actions'
import { Category as CategoryType } from 'store/categories/types'
import { updateTransaction } from 'store/transactions/actions'
import { Transaction as TransactionType } from 'store/transactions/types'
import { colors } from 'theme'

export interface Props {
  transaction: TransactionType
  exitFlow: () => void
}

const TransactionFlow: React.FC<Props> = ({ transaction, exitFlow }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState(colors.categories[0])
  const dispatch = useDispatch()

  const handleCreateCategory = async (e: any) => {
    e.preventDefault()

    try {
      const category: any = await dispatch(createCategory({ name: categoryName, color: categoryColor }))

      await dispatch(updateTransaction(transaction.id, category.id))

      setActiveStep(0)
    } catch (error) {
      console.error(error)
    }
  }

  const onCategoryClick = async (categoryId: CategoryType['id']) => {
    try {
      await dispatch(updateTransaction(transaction.id, categoryId))

      setActiveStep(0)
    } catch (error) {
      console.error(error)
    }
  }

  const onSetCategoryColor = (color: CategoryType['color']) => {
    setCategoryColor(color)
    setActiveStep(2)
  }

  const steps = [
    <Popup leftButton='close' onLeftButtonClick={exitFlow} onClickOutside={exitFlow}>
      <Transaction transaction={transaction} onCategoryClick={() => setActiveStep(1)} />
    </Popup>,
    <Popup
      title='Choose a Category'
      leftButton='back'
      onLeftButtonClick={() => setActiveStep(0)}
      onClickOutside={exitFlow}
    >
      <ChooseCategory onCategoryClick={onCategoryClick} onCreateCategoryClick={() => setActiveStep(2)} />
    </Popup>,
    <Popup
      onClickOutside={exitFlow}
      onLeftButtonClick={() => setActiveStep(1)}
      title='Create a Category'
      leftButton='back'
    >
      <Category
        onEditColor={() => setActiveStep(3)}
        onFormSubmit={handleCreateCategory}
        categoryColor={categoryColor}
        currentName={categoryName}
        setCategoryName={setCategoryName}
        submitText='Create'
      />
    </Popup>,
    <Popup onClickOutside={exitFlow} title='Pick a Color' leftButton='back' onLeftButtonClick={() => setActiveStep(2)}>
      <ColorPicker currentColor={categoryColor} onSetCategoryColor={onSetCategoryColor} />
    </Popup>,
  ]

  return steps[activeStep]
}

export default TransactionFlow
