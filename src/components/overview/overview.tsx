import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'

import { formatCurrency } from 'utils'
import { useCategories, useTransactions } from 'hooks'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

interface BreakdownItem {
  name: string
  amount: number
}

const Overview: React.FC<Props> = ({ match }) => {
  const { id, date } = match.params
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([])
  const transactions = useTransactions(id, date)
  const categories = useCategories() || { items: [] }

  useEffect(() => {
    const transactionBreakdown = categories.map(({ id, name }) => {
      const amount = transactions.reduce((total: number, transaction) => {
        if (transaction.category === id) {
          return total + transaction.amount
        }

        return total
      }, 0)

      return { name, amount }
    })

    setBreakdown(transactionBreakdown)
  }, [categories, transactions])

  return (
    <>
      <h1>{format(new Date(date), 'LLLL')} Overview</h1>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {breakdown.map(category => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>{formatCurrency(category.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Overview
