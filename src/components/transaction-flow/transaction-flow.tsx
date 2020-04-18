import React, { useState } from 'react'

import { Transaction } from 'store/transactions/types'
import TransactionDetails from 'components/transaction-details'
import EditTransactionCategory from 'components/edit-transaction-category'

export interface Props {
  transaction: Transaction
  exitFlow: any
}

export enum Step {
  TransactionDetails = 'TransactionDetails',
  EditTransactionCategory = 'EditTransactionCategory',
}

const TransactionFlow: React.FC<Props> = ({ transaction, exitFlow }) => {
  const [step, setStep] = useState<Step>(Step['TransactionDetails'])

  const steps = {
    TransactionDetails: (
      <TransactionDetails
        transaction={transaction}
        onLeftButtonClick={exitFlow}
        onClickOutside={exitFlow}
        onCategoryClick={() => setStep(Step['EditTransactionCategory'])}
      />
    ),
    EditTransactionCategory: (
      <EditTransactionCategory
        onLeftButtonClick={() => setStep(Step['TransactionDetails'])}
        onClickOutside={exitFlow}
        onCategoryClick={() => setStep(Step['TransactionDetails'])}
        transactionId={transaction.id}
      />
    ),
  }

  return steps[step]
}

export default TransactionFlow
