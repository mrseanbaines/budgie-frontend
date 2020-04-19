import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createCategory } from 'store/categories/actions'
import { updateTransaction } from 'store/transactions/actions'
import { Transaction } from 'store/transactions/types'
import TransactionDetails from 'components/transaction-details'
import EditTransactionCategory from 'components/edit-transaction-category'
import CreateCategory from 'components/create-category'
import EditCategoryColor from 'components/edit-category-color'
import { colors } from 'theme'

export interface Props {
  transaction: Transaction
  exitFlow: () => void
}

export enum Step {
  TransactionDetails = 'TransactionDetails',
  EditTransactionCategory = 'EditTransactionCategory',
  CreateCategory = 'CreateCategory',
  EditCategoryColor = 'EditCategoryColor',
}

const TransactionFlow: React.FC<Props> = ({ transaction, exitFlow }) => {
  const [step, setStep] = useState<Step>(Step['TransactionDetails'])
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState(colors.categories[0])
  const dispatch = useDispatch()

  const handleCreateCategory = async (e: any) => {
    e.preventDefault()

    try {
      const category: any = await dispatch(createCategory({ name: categoryName, color: categoryColor }))
      await dispatch(updateTransaction(transaction.id, category.id))
    } catch (error) {
      console.error(error)
    } finally {
      setStep(Step['TransactionDetails'])
    }
  }

  const steps = {
    TransactionDetails: (
      <TransactionDetails
        transaction={transaction}
        onClickOutside={exitFlow}
        onLeftButtonClick={exitFlow}
        onCategoryClick={() => setStep(Step['EditTransactionCategory'])}
      />
    ),
    EditTransactionCategory: (
      <EditTransactionCategory
        transactionId={transaction.id}
        onClickOutside={exitFlow}
        onLeftButtonClick={() => setStep(Step['TransactionDetails'])}
        onCategoryClick={() => setStep(Step['TransactionDetails'])}
        onCreateCategoryClick={() => setStep(Step['CreateCategory'])}
      />
    ),
    CreateCategory: (
      <CreateCategory
        onClickOutside={exitFlow}
        onLeftButtonClick={() => setStep(Step['EditTransactionCategory'])}
        onEditColor={() => setStep(Step['EditCategoryColor'])}
        handleCreateCategory={handleCreateCategory}
        categoryColor={categoryColor}
        currentName={categoryName}
        setCategoryName={setCategoryName}
      />
    ),
    EditCategoryColor: (
      <EditCategoryColor
        onClickOutside={exitFlow}
        onLeftButtonClick={() => setStep(Step['CreateCategory'])}
        currentColor={categoryColor}
        setCategoryColor={setCategoryColor}
      />
    ),
  }

  return steps[step]
}

export default TransactionFlow
