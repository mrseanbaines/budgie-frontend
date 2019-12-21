import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import { sortDesc } from 'utils'
import { fetchTransactions } from 'store/transactions/actions'
import { getTransactionItems } from 'store/transactions/selectors'
import Transaction from 'components/transaction'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

const Transactions: React.FC<Props> = ({ match }) => {
  const { id, date } = match.params

  const dispatch = useDispatch()
  const transactions = useSelector(getTransactionItems)

  useEffect(() => {
    dispatch(fetchTransactions(id, date))
  }, [dispatch, id, date])

  if (!transactions) {
    return null
  }

  return (
    <>
      <h1>{format(new Date(date), 'LLLL')} Transactions</h1>

      {transactions.sort(sortDesc).map(transaction => (
        <div key={transaction.id}>
          <Transaction {...transaction} />
          <br />
        </div>
      ))}
    </>
  )
}

export default Transactions
