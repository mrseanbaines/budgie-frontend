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

export enum Step {
  Transaction = 'Transaction',
  ChooseCategory = 'ChooseCategory',
  CreateCategory = 'CreateCategory',
  ColorPicker = 'ColorPicker',
}

const TransactionFlow: React.FC<Props> = ({ transaction, exitFlow }) => {
  const [step, setStep] = useState<Step>(Step['Transaction'])
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState(colors.categories[0])
  const dispatch = useDispatch()

  const handleCreateCategory = async (e: any) => {
    e.preventDefault()

    try {
      const category: any = await dispatch(createCategory({ name: categoryName, color: categoryColor }))

      await dispatch(updateTransaction(transaction.id, category.id))

      setStep(Step['Transaction'])
    } catch (error) {
      console.error(error)
    }
  }

  const onCategoryClick = async (categoryId: CategoryType['id']) => {
    try {
      await dispatch(updateTransaction(transaction.id, categoryId))

      setStep(Step['Transaction'])
    } catch (error) {
      console.error(error)
    }
  }

  const onSetCategoryColor = (color: CategoryType['color']) => {
    setCategoryColor(color)
    setStep(Step['CreateCategory'])
  }

  const steps = {
    Transaction: (
      <Popup leftButton='close' onLeftButtonClick={exitFlow} onClickOutside={exitFlow}>
        <Transaction transaction={transaction} onCategoryClick={() => setStep(Step['ChooseCategory'])} />
      </Popup>
    ),
    ChooseCategory: (
      <Popup
        title='Choose a Category'
        leftButton='back'
        onLeftButtonClick={() => setStep(Step['Transaction'])}
        onClickOutside={exitFlow}
      >
        <ChooseCategory
          onCategoryClick={onCategoryClick}
          onCreateCategoryClick={() => setStep(Step['CreateCategory'])}
        />
      </Popup>
    ),
    CreateCategory: (
      <Popup
        onClickOutside={exitFlow}
        onLeftButtonClick={() => setStep(Step['ChooseCategory'])}
        title='Create a Category'
        leftButton='back'
      >
        <Category
          onEditColor={() => setStep(Step['ColorPicker'])}
          onFormSubmit={handleCreateCategory}
          categoryColor={categoryColor}
          currentName={categoryName}
          setCategoryName={setCategoryName}
          submitText='Create'
        />
      </Popup>
    ),
    ColorPicker: (
      <Popup
        onClickOutside={exitFlow}
        title='Pick a Color'
        leftButton='back'
        onLeftButtonClick={() => setStep(Step['CreateCategory'])}
      >
        <ColorPicker currentColor={categoryColor} onSetCategoryColor={onSetCategoryColor} />
      </Popup>
    ),
  }

  return steps[step]
}

export default TransactionFlow
