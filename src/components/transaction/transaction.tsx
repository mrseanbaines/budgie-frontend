import React from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'

import { updateTransaction } from 'store/transactions/actions'
import { formatCurrency } from 'utils'
import { useCategories } from 'hooks'
import { Transaction as TransactionType } from 'types'

const Transaction: React.FC<TransactionType> = ({ id, amount, notes, merchant, counterparty, created, category }) => {
  const dispatch = useDispatch()
  const categoryOptions: any = useCategories() || []

  const handleCategoryUpdate = async (e: React.ChangeEvent<HTMLSelectElement>, transactionId: string) => {
    dispatch(updateTransaction(transactionId, e.target.value || null))
  }

  if (!categoryOptions || !categoryOptions.items) {
    return null
  }

  return (
    <div>
      <div>
        <small>{format(new Date(created), 'dd MMMM, yyyy')}</small>
      </div>

      <div>{formatCurrency(amount)}</div>

      <div>{merchant && typeof merchant === 'object' ? merchant.name : counterparty.name}</div>

      {notes && <small>{notes}</small>}

      <div>
        <label htmlFor={id}>Category: </label>
        <select name='category' id={id} onChange={e => handleCategoryUpdate(e, id)} value={category || ''}>
          <option value=''>-</option>

          {categoryOptions.items.map((categoryOption: any) => (
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
