import React, { useState } from 'react'

import { Transaction } from 'store/transactions/types'
import TransactionDetails from 'components/transaction-details'
import EditTransactionCategory from 'components/edit-transaction-category'
import CreateCategory from 'components/create-category'

export interface Props {
  transaction: Transaction
  exitFlow: any
}

export enum Step {
  TransactionDetails = 'TransactionDetails',
  EditTransactionCategory = 'EditTransactionCategory',
  CreateCategory = 'CreateCategory',
}

const TransactionFlow: React.FC<Props> = ({ transaction, exitFlow }) => {
  const [step, setStep] = useState<Step>(Step['TransactionDetails'])

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
        transactionId={transaction.id}
        onClickOutside={exitFlow}
        onLeftButtonClick={() => setStep(Step['EditTransactionCategory'])}
        onCreateCategory={() => setStep(Step['TransactionDetails'])}
      />
    ),
  }

  return steps[step]
}

export default TransactionFlow
