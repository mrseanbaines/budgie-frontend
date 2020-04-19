import React, { useEffect, useState } from 'react'
import { format, isSameDay } from 'date-fns'
import { groupWith, sum } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

// import { Category } from 'store/categories/types'
import { fetchCategories } from 'store/categories/actions'
import { getCategoryItems } from 'store/categories/selectors'
import { Transaction } from 'store/transactions/types'
import { fetchTransactions } from 'store/transactions/actions'
import { getTransactionItems } from 'store/transactions/selectors'
import TransactionFlow from 'components/transaction-flow'
import { ListHeading, ListItem } from 'components/list'
import Header from 'components/header'
import Nav from 'components/nav'
import TextInput from 'components/text-input'
import { formatCurrency } from 'utils'

import * as s from './transactions.styles'

const Transactions: React.FC = () => {
  const transactions = useSelector(getTransactionItems)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  // const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id'] | null>(null)
  const [selectedTransactionId, setSelectedTransactionId] = useState<Transaction['id'] | null>(null)
  const categories = useSelector(getCategoryItems)
  const selectedCategory = transactions.find(t => t.id === selectedTransactionId)

  // TODO: Make this dynamic
  const date = '2020-02-01'

  useEffect(() => {
    // TODO: Revisit this
    const d = date
    dispatch(fetchTransactions(d))
    dispatch(fetchCategories())
  }, [dispatch, date])

  const searchFilter = (transaction: Transaction) => {
    return (
      transaction.merchant?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.counterparty?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (!transaction.merchant && !searchQuery)
    )
  }

  // const categoryFilter = (transaction: Transaction) => {
  //   return selectedCategoryId ? transaction.category === selectedCategoryId : true
  // }

  const filteredTransactions = transactions
    // .filter(t => t.amount < 0)
    .filter(t => t.include_in_spending)
    .filter(searchFilter)
  // .filter(categoryFilter)

  // TODO: Reorganise this?
  const transactionsByDay = groupWith(
    (a, b) => isSameDay(new Date(a.created), new Date(b.created)),
    filteredTransactions,
  ).map(dayTransactions => ({
    date: format(new Date(dayTransactions[0].created), 'E d MMM'),
    total: sum(dayTransactions.map(t => t.amount)),
    transactions: dayTransactions,
  }))

  const total = sum(
    transactions
      .filter(t => t.amount < 0)
      // .filter(t => t.include_in_spending)
      .filter(searchFilter)
      // .filter(categoryFilter)
      .map(t => t.amount),
  )

  return (
    <>
      <s.Wrapper>
        <Header title='Transactions' subtitle={format(new Date(date), 'MMMM yyyy')} />

        <s.UpperSection>
          <s.Total>
            <s.TotalLabel>Total Spent</s.TotalLabel>
            <s.TotalAmount>{formatCurrency(total)}</s.TotalAmount>
          </s.Total>

          <TextInput placeholder='Search for a merchant' onChange={({ target: { value } }) => setSearchQuery(value)} />
        </s.UpperSection>

        <s.ScrollableArea>
          <s.Body>
            {transactionsByDay.map(day => (
              <div key={day.date}>
                <s.ListHeadingWrapper>
                  <ListHeading title={day.date} extra={formatCurrency(day.total)} />
                </s.ListHeadingWrapper>

                {day.transactions.map(transaction => (
                  <ListItem
                    key={transaction.id}
                    badgeColor={categories.find(c => c.id === transaction.category)?.color}
                    // TODO: What if both of these don't exist?
                    title={transaction.merchant?.name ?? transaction.counterparty.name ?? ''}
                    extra={formatCurrency(transaction.amount)}
                    onClick={() => setSelectedTransactionId(transaction.id)}
                  />
                ))}
              </div>
            ))}
          </s.Body>
        </s.ScrollableArea>

        <Nav />
      </s.Wrapper>

      {selectedCategory && (
        <TransactionFlow transaction={selectedCategory} exitFlow={() => setSelectedTransactionId(null)} />
      )}
    </>
  )
}

export default Transactions
