import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { groupWith, sum } from 'ramda'
import { format, isSameDay } from 'date-fns'

import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
import { getCategoryItems } from 'store/categories/selectors'
import { getTransactionItems } from 'store/transactions/selectors'
import { Transaction } from 'store/transactions/types'
import { ListHeading, ListItem } from 'components/list'
import TextInput from 'components/text-input'
import Header from 'components/header'
import Nav from 'components/nav'
import Popup from 'components/popup'
import { formatCurrency } from 'utils'

import * as s from './transactions.styles'

const Transactions: React.FC = () => {
  const transactions = useSelector(getTransactionItems)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const categories = useSelector(getCategoryItems)

  const date = '2020-02-01'

  useEffect(() => {
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

  const categoryFilter = (transaction: Transaction) => {
    return selectedCategoryId ? transaction.category === selectedCategoryId : true
  }

  const filteredTransactions = transactions
    // .filter(t => t.amount < 0)
    .filter(t => t.include_in_spending)
    .filter(searchFilter)
    .filter(categoryFilter)

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
      .filter(categoryFilter)
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
                    title={transaction.merchant?.name ?? transaction.counterparty.name}
                    extra={formatCurrency(transaction.amount)}
                    onClick={() => setSelectedTransaction(transaction)}
                  />
                ))}
              </div>
            ))}
          </s.Body>
        </s.ScrollableArea>

        <Nav />
      </s.Wrapper>

      {selectedTransaction && (
        <Popup
          leftButton='close'
          title='Select a Category'
          onLeftButtonClick={() => setSelectedTransaction(null)}
          onClickOutside={() => setSelectedTransaction(null)}
        >
          <h1 style={{ textAlign: 'center' }}>
            {selectedTransaction.merchant?.name ?? selectedTransaction.counterparty.name}
          </h1>
        </Popup>
      )}
    </>
  )
}

export default Transactions
