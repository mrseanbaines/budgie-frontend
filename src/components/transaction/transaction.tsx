import React from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'

import { updateTransaction } from 'store/transactions/actions'
import { formatCurrency } from 'utils'
import { Transaction as TransactionType, Category } from 'types'

interface Props {
  transaction: TransactionType
  categories: Category[]
}

const Transaction: React.FC<Props> = ({ transaction, categories }) => {
  const dispatch = useDispatch()

  const handleCategoryUpdate = async (e: React.ChangeEvent<HTMLSelectElement>, transactionId: string) => {
    dispatch(updateTransaction(transactionId, e.target.value || null))
  }

  return (
    <div>
      <div>
        <small>{format(new Date(transaction.created), 'dd MMMM, yyyy')}</small>
      </div>

      <div>{formatCurrency(transaction.amount)}</div>

      <div>{typeof transaction.merchant === 'object' ? transaction.merchant.name : transaction.counterparty.name}</div>

      {transaction.notes && <small>{transaction.notes}</small>}

      <div>
        <label htmlFor={transaction.id}>Category: </label>
        <select
          name='category'
          id={transaction.id}
          onChange={e => handleCategoryUpdate(e, transaction.id)}
          value={transaction.category || ''}
        >
          <option value=''>-</option>

          {categories.map((categoryOption: any) => (
            <option key={categoryOption.id} value={categoryOption.id}>
              {categoryOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Transaction
