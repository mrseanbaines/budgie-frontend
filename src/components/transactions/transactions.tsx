import React, { useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import Layout from 'components/layout'
import Header from 'components/header'
import TextInput from 'components/text-input'
import { ListHeading, ListItem } from 'components/list'
import TransactionFlow from 'components/transaction-flow'
import { getCategoryItems } from 'store/categories/selectors'
import { Transaction } from 'store/transactions/types'
import { getTransactionItems } from 'store/transactions/selectors'
import { getActiveDate, getSelectedCategoryId, getMinAmount, getMaxAmount } from 'store/view/selectors'
import { formatCurrency, groupByDay } from 'utils'
import * as s from 'styles/common'

const Transactions: React.FC = () => {
  const activeDate = useSelector(getActiveDate)
  const transactions = useSelector(getTransactionItems)
  const categories = useSelector(getCategoryItems)
  const selectedCategoryId = useSelector(getSelectedCategoryId)
  const minAmount = useSelector(getMinAmount)
  const maxAmount = useSelector(getMaxAmount)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTransactionId, setSelectedTransactionId] = useState<Transaction['id'] | null>(null)
  const selectedTransaction = transactions.find(t => t.id === selectedTransactionId)

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

  const amountFilter = (transaction: Transaction) => {
    return (
      (minAmount ? Math.abs(transaction.amount) >= minAmount : true) &&
      (maxAmount ? Math.abs(transaction.amount) <= maxAmount : true)
    )
  }

  const filteredTransactions = transactions
    .filter(t => t.amount < 0)
    .filter(searchFilter)
    .filter(categoryFilter)
    .filter(amountFilter)
  // .filter(t => t.include_in_spending)

  const transactionsByDay = groupByDay(filteredTransactions).map(dayTransactions => ({
    date: format(new Date(dayTransactions[0].created), 'E d MMM'),
    total: R.sum(dayTransactions.map(R.prop('amount'))),
    transactions: dayTransactions,
  }))

  const total = R.sum(filteredTransactions.map(R.prop('amount')))

  return (
    <>
      <s.Wrapper>
        <s.HeaderWrapper>
          {activeDate && (
            <Header
              title='Transactions'
              subtitle={format(new Date(activeDate), 'MMMM yyyy')}
              withFilters
              withDateSelect
            />
          )}

          <s.UpperSection>
            <s.Total>
              <s.TotalLabel>Total Spent</s.TotalLabel>
              <s.TotalAmount>{formatCurrency(total)}</s.TotalAmount>
            </s.Total>

            <TextInput
              type='search'
              value={searchQuery}
              placeholder='Search for a merchant'
              onChange={({ target: { value } }) => setSearchQuery(value)}
            />
          </s.UpperSection>
        </s.HeaderWrapper>

        <Layout>
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
        </Layout>
      </s.Wrapper>

      {selectedTransaction && (
        <TransactionFlow transaction={selectedTransaction} exitFlow={() => setSelectedTransactionId(null)} />
      )}
    </>
  )
}

export default Transactions
