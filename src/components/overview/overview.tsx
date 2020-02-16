import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import { formatCurrency } from 'utils'
import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
import { getTransactionItems } from 'store/transactions/selectors'
import { getCategoryItems } from 'store/categories/selectors'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

interface BreakdownItem {
  name: string
  amount: number
  id: string
}

interface CategoryItemProps {
  name: string
  amount: number
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, amount }) => (
  <tr>
    <td>{name}</td>
    <td>{formatCurrency(amount)}</td>
  </tr>
)

const Overview: React.FC<Props> = ({ match }) => {
  const { date } = match.params
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([])
  const [uncategorised, setUncategorised] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const dispatch = useDispatch()
  const transactions = useSelector(getTransactionItems)
  const categories = useSelector(getCategoryItems)

  useEffect(() => {
    dispatch(fetchTransactions(date))
    dispatch(fetchCategories())
  }, [dispatch, date])

  useEffect(() => {
    const categoryTotals = categories.map(({ id, name }) => {
      const amount = transactions.reduce((total: number, transaction) => {
        if (transaction.category === id) {
          return total + transaction.amount
        }

        return total
      }, 0)

      return { name, amount, id }
    })

    const uncategorisedTotal = transactions.reduce((total: number, transaction) => {
      if (!transaction.category) {
        return total + transaction.amount
      }

      return total
    }, 0)

    const totalAmount = categoryTotals.reduce((sum, item) => sum + item.amount, 0) + uncategorisedTotal

    setBreakdown(categoryTotals)
    setUncategorised(uncategorisedTotal)
    setTotal(totalAmount)
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
            <CategoryItem key={category.id} name={category.name} amount={category.amount} />
          ))}

          <CategoryItem name='Uncategorised' amount={uncategorised} />
          <CategoryItem name='Total' amount={total} />
        </tbody>
      </table>
    </>
  )
}

export default Overview
