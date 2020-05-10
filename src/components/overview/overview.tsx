import React, { useState } from 'react'
import { format } from 'date-fns'
import * as R from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { ListHeading, ListItem } from 'components/list'
import { Props as DateSelectProps } from 'components/date-select/date-select'
import TransactionFlow from 'components/transaction-flow'
import Header from 'components/header'
import Navigation from 'components/navigation'
import DateSelect from 'components/date-select'
import { getCategoryItems } from 'store/categories/selectors'
import { getTransactionItems, getTransactionsSummaries } from 'store/transactions/selectors'
import { Transaction } from 'store/transactions/types'
import { Category } from 'store/categories/types'
import { setActiveDate } from 'store/view/actions'
import { getActiveDate } from 'store/view/selectors'

import { formatCurrency, groupByCategory } from 'utils'

import * as s from './overview.styles'

const Overview: React.FC = () => {
  const activeDate = useSelector(getActiveDate)
  const transactions = useSelector(getTransactionItems)
  const categories = useSelector(getCategoryItems)
  const [showDateSelect, setShowDateSelect] = useState(false)
  const transactionsSummaries = useSelector(getTransactionsSummaries)
  const dispatch = useDispatch()
  const [selectedTransactionId, setSelectedTransactionId] = useState<Transaction['id'] | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id'] | null>('')
  const selectedTransaction = transactions.find(t => t.id === selectedTransactionId)

  const filteredTransactions = transactions.filter(t => t.amount < 0).filter(t => t.include_in_spending)

  const transactionsByCategory = groupByCategory(filteredTransactions).map(categoryTransactions => ({
    total: R.sum(categoryTransactions.map(t => t.amount)),
    id: categoryTransactions[0].category,
    category: categories.find(c => c.id === categoryTransactions[0].category),
    transactions: categoryTransactions,
  }))

  const orderedItems = R.sort(R.ascend(R.prop('total')), transactionsByCategory)

  const total = R.sum(
    transactions
      .filter(t => !!t.category)
      .filter(t => t.amount < 0)
      // .filter(t => t.include_in_spending)
      .map(t => t.amount),
  )

  const onDateSelect: DateSelectProps['onDateSelect'] = item => {
    dispatch(setActiveDate(item.date))
    setShowDateSelect(false)
  }

  const handleSetSelectedCategory = (id: Category['id'] | null) => {
    if (id === selectedCategoryId) {
      setSelectedCategoryId('')
    } else {
      setSelectedCategoryId(id)
    }
  }

  return (
    <>
      <s.Wrapper>
        <s.HeaderWrapper>
          {activeDate && (
            <Header
              title='Overview'
              subtitle={format(new Date(activeDate), 'MMMM yyyy')}
              withDateSelect
              onDateSelectClick={() => setShowDateSelect(showDateSelect => !showDateSelect)}
            />
          )}

          {showDateSelect && <DateSelect items={transactionsSummaries} onDateSelect={onDateSelect} />}

          <s.UpperSection>
            <s.Total>
              <s.TotalLabel>Total Categorised</s.TotalLabel>
              <s.TotalAmount>{formatCurrency(total)}</s.TotalAmount>
            </s.Total>
          </s.UpperSection>
        </s.HeaderWrapper>

        <s.ScrollableArea>
          <s.Body>
            {orderedItems.map(c => (
              <div key={c.category?.id ?? 'Uncategorised'}>
                <s.ListHeadingWrapper>
                  <ListHeading
                    title={c.category?.name ?? 'Uncategorised'}
                    extra={formatCurrency(c.total)}
                    onClick={() => handleSetSelectedCategory(c.id)}
                  />
                </s.ListHeadingWrapper>

                {selectedCategoryId === c.id &&
                  c.transactions.map(transaction => (
                    <ListItem
                      key={transaction.id}
                      badgeColor={c.category?.color}
                      title={transaction.merchant?.name ?? transaction.counterparty.name ?? ''}
                      extra={formatCurrency(transaction.amount)}
                      onClick={() => setSelectedTransactionId(transaction.id)}
                    />
                  ))}
              </div>
            ))}
          </s.Body>
        </s.ScrollableArea>

        <s.NavigationWrapper>
          <Navigation />
        </s.NavigationWrapper>
      </s.Wrapper>

      {selectedTransaction && (
        <TransactionFlow transaction={selectedTransaction} exitFlow={() => setSelectedTransactionId(null)} />
      )}
    </>
  )
}

export default Overview
