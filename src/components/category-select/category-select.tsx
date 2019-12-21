import React from 'react'
import { Category } from 'types'

interface Props {
  categories: Category[]
  transactionId: string
}

const CategorySelect: React.FC<Props> = ({ categories, transactionId }) => {
  interface TransactionData {
    [key: string]: string
  }

  let transactionData: TransactionData = JSON.parse(sessionStorage.getItem('transaction_data') || '{}')

  const handleCategoryUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { transaction } = e.target.dataset
    const category = e.target.value

    if (!transaction || !category) {
      throw new Error('Missing category or transaction')
    }

    const newTransactionData = {
      ...transactionData,
      [transaction]: category,
    }

    sessionStorage.setItem('transaction_data', JSON.stringify(newTransactionData))
  }

  return (
    <>
      <label htmlFor={transactionId}>Category: </label>
      <select
        name='category'
        id={transactionId}
        data-transaction={transactionId}
        onChange={handleCategoryUpdate}
        value={transactionData[transactionId]}
      >
        <option>-</option>
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </>
  )
}

export default CategorySelect
