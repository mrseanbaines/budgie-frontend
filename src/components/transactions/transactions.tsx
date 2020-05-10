import React, { useState } from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import DateSelect from 'components/date-select'
import TransactionFlow from 'components/transaction-flow'
import { ListHeading, ListItem } from 'components/list'
import Header from 'components/header'
import Navigation from 'components/navigation'
import TextInput from 'components/text-input'
import { Props as DateSelectProps } from 'components/date-select/date-select'
// import { Category } from 'store/categories/types'
import { getCategoryItems } from 'store/categories/selectors'
import { Transaction } from 'store/transactions/types'
import { getTransactionItems, getTransactionsSummaries } from 'store/transactions/selectors'
import { setActiveDate } from 'store/view/actions'
import { getActiveDate } from 'store/view/selectors'
import { formatCurrency, groupByDay } from 'utils'

import * as s from './transactions.styles'

const Transactions: React.FC = () => {
  const activeDate = useSelector(getActiveDate)
  const transactions = useSelector(getTransactionItems)
  const transactionsSummaries = useSelector(getTransactionsSummaries)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDateSelect, setShowDateSelect] = useState(false)
  // const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id'] | null>(null)
  const [selectedTransactionId, setSelectedTransactionId] = useState<Transaction['id'] | null>(null)
  const categories = useSelector(getCategoryItems)
  const selectedTransaction = transactions.find(t => t.id === selectedTransactionId)

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
    .filter(t => t.amount < 0)
    // .filter(t => t.include_in_spending)
    .filter(searchFilter)
  // .filter(categoryFilter)

  const transactionsByDay = groupByDay(filteredTransactions).map(dayTransactions => ({
    date: format(new Date(dayTransactions[0].created), 'E d MMM'),
    total: R.sum(dayTransactions.map(t => t.amount)),
    transactions: dayTransactions,
  }))

  const total = R.sum(
    transactions
      .filter(t => t.amount < 0)
      // .filter(t => t.include_in_spending)
      // .filter(categoryFilter)
      .filter(searchFilter)
      .map(t => t.amount),
  )

  const onDateSelect: DateSelectProps['onDateSelect'] = item => {
    dispatch(setActiveDate(item.date))
    setShowDateSelect(false)
  }

  return (
    <>
      <s.Wrapper>
        {activeDate && (
          <Header
            title='Transactions'
            subtitle={format(new Date(activeDate), 'MMMM yyyy')}
            withFilters
            withDateSelect
            onDateSelectClick={() => setShowDateSelect(showDateSelect => !showDateSelect)}
          />
        )}

        {showDateSelect && <DateSelect items={transactionsSummaries} onDateSelect={onDateSelect} />}

        <s.UpperSection>
          <s.Total>
            <s.TotalLabel>Total Spent</s.TotalLabel>
            <s.TotalAmount>{formatCurrency(total)}</s.TotalAmount>
          </s.Total>

          <TextInput
            value={searchQuery}
            placeholder='Search for a merchant'
            onChange={({ target: { value } }) => setSearchQuery(value)}
          />
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

        <Navigation />
      </s.Wrapper>

      {selectedTransaction && (
        <TransactionFlow transaction={selectedTransaction} exitFlow={() => setSelectedTransactionId(null)} />
      )}
    </>
  )
}

export default Transactions
