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
import { Overlay } from 'styles/overlay'
import { formatCurrency } from 'utils'

import * as s from './transactions.styles'

const Transactions: React.FC = () => {
  const transactions = useSelector(getTransactionItems)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
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

  const foo = transactions
    // .filter(t => t.amount < 0)
    .filter(t => t.include_in_spending)
    .filter(searchFilter)
    .filter(categoryFilter)
    .map(t => ({
      ...t,
      created: new Date(t.created),
      category: categories.find(c => c.id === t.category),
    }))

  const transactionsByDay = groupWith((a, b) => isSameDay(a.created, b.created), foo).map(dayTransactions => ({
    date: format(dayTransactions[0].created, 'E d MMM'),
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
                    badgeColor={transaction.category?.color}
                    title={transaction.merchant?.name ?? transaction.counterparty.name}
                    extra={formatCurrency(transaction.amount)}
                    onClick={() => setShowTransactionDetails(true)}
                  />
                ))}
              </div>
            ))}
          </s.Body>
        </s.ScrollableArea>

        <Nav />
      </s.Wrapper>

      {showTransactionDetails && (
        <>
          <Overlay />

          <Popup
            leftButton='close'
            title='Select a Category'
            onLeftButtonClick={() => setShowTransactionDetails(false)}
          >
            <h1 style={{ textAlign: 'center' }}>Hello, world!</h1>
          </Popup>
        </>
      )}
    </>
  )
}

export default Transactions
