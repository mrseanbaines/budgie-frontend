import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'

import { useCategories, useTransactions } from 'hooks'
import { sortDesc } from 'utils'
import Transaction from 'components/transaction'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

const Transactions: React.FC<Props> = ({ match }) => {
  const { id, date } = match.params
  const transactions = useTransactions(id, date)
  const categories = useCategories() || { items: [] }

  return (
    <>
      <h1>{format(new Date(date), 'LLLL')} Transactions</h1>

      {transactions.sort(sortDesc).map(transaction => (
        <div key={transaction.id}>
          <Transaction transaction={transaction} categories={categories} />

          <br />
        </div>
      ))}
    </>
  )
}

export default Transactions
