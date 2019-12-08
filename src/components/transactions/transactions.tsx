import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { addMonths, format } from 'date-fns'

import { formatCurrency, sortDesc } from 'utils'
import { Transaction } from 'types'
import { useCategories } from 'hooks'
import CategorySelect from 'components/category-select'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

const MonthTransactions: React.FC<Props> = ({ match }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState<string | null>(null)
  const { id, date } = match.params

  const categories = useCategories()

  // const [transactionData, setTransactionData] = useState<{
  //   [key: string]: string
  // }>({})
  // useEffect(() => {
  //   const transactionDataFromStorage = sessionStorage.getItem(
  //     'transaction_data',
  //   )

  //   if (!transactionDataFromStorage) {
  //     return
  //   }

  //   setTransactionData(JSON.parse(transactionDataFromStorage))
  // }, [transactionData])

  useEffect(() => {
    const fetchAccounts = async () => {
      const { REACT_APP_MONZO_BASE_URL = '' } = process.env
      const accessToken = sessionStorage.getItem('token')

      const query = new URLSearchParams({
        account_id: id,
        since: new Date(date).toISOString(),
        before: new Date(addMonths(new Date(date), 1)).toISOString(),
      })

      try {
        const response = await fetch(
          `${REACT_APP_MONZO_BASE_URL}/transactions?expand[]=merchant&${query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        const json = await response.json()

        if (response.status !== 200) {
          setError(json.message)
          return
        }

        setTransactions(json.transactions)
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchAccounts()
  }, [id, date])

  if (error) {
    return <h1>{error}</h1>
  }

  if (!categories || !transactions) {
    return null
  }

  return (
    <>
      <h1>{format(new Date(date), 'LLLL')} Transactions</h1>

      {[...transactions]
        .sort(sortDesc)
        .map(({ id, amount, notes, merchant, counterparty, created }) => (
          <div key={id}>
            <div>
              <small>{format(new Date(created), 'dd MMMM, yyyy')}</small>
            </div>

            <div>{formatCurrency(amount)}</div>

            <div>
              {merchant && typeof merchant === 'object'
                ? merchant.name
                : counterparty.name}
            </div>

            {notes && <small>{notes}</small>}

            <div>
              <CategorySelect
                categories={categories.items}
                transactionId={id}
              />
            </div>

            <br />
          </div>
        ))}
    </>
  )
}

export default MonthTransactions
