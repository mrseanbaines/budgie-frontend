import React, { useState } from 'react'
import { format } from 'date-fns'
import * as R from 'ramda'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import Layout from 'components/layout'
import { ListHeading, ListItem } from 'components/list'
import TransactionFlow from 'components/transaction-flow'
import Header from 'components/header'
import { getCategoryItems } from 'store/categories/selectors'
import { getTransactionItems } from 'store/transactions/selectors'
import { Transaction } from 'store/transactions/types'
import { Category } from 'store/categories/types'
import { getActiveDate } from 'store/view/selectors'
import { colors } from 'theme'
import { formatCurrency, groupByCategory } from 'utils'
import * as sc from 'styles/common'

const Overview: React.FC = () => {
  const activeDate = useSelector(getActiveDate)
  const transactions = useSelector(getTransactionItems)
  const categories = useSelector(getCategoryItems)
  const [selectedTransactionId, setSelectedTransactionId] = useState<Transaction['id'] | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id'] | null>('')
  const selectedTransaction = transactions.find(t => t.id === selectedTransactionId)

  const filteredTransactions = transactions.filter(t => !!t.category).filter(t => t.amount < 0)
  // .filter(t => t.include_in_spending)

  const transactionsByCategory = groupByCategory(filteredTransactions).map(categoryTransactions => ({
    total: R.sum(categoryTransactions.map(R.prop('amount'))),
    id: categoryTransactions[0].category,
    category: categories.find(c => c.id === categoryTransactions[0].category),
    transactions: categoryTransactions,
  }))

  const orderedItems = R.sort(R.ascend(R.prop('total')), transactionsByCategory)

  const total = R.sum(filteredTransactions.map(R.prop('amount')))

  const handleSetSelectedCategory = (id: Category['id'] | null) => {
    if (id === selectedCategoryId) {
      setSelectedCategoryId('')
    } else {
      setSelectedCategoryId(id)
    }
  }

  return (
    <>
      <sc.Wrapper>
        <sc.HeaderWrapper>
          {activeDate && (
            <Header title='Overview' subtitle={format(new Date(activeDate), 'MMMM yyyy')} withDateSelect />
          )}

          <sc.UpperSection>
            <ResponsiveContainer height={200}>
              <PieChart>
                <Pie
                  data={transactionsByCategory.map(x => ({ total: Math.abs(x.total) }))}
                  cx='50%'
                  cy='50%'
                  innerRadius={90}
                  outerRadius={100}
                  dataKey='total'
                  animationBegin={100}
                  animationDuration={600}
                >
                  {transactionsByCategory.map((c, i) => (
                    <Cell key={`cell-${i}`} fill={c.category?.color ?? colors.grey[3]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <sc.Total>
              <sc.TotalLabel>Total Categorised</sc.TotalLabel>
              <sc.TotalAmount>{formatCurrency(total)}</sc.TotalAmount>
            </sc.Total>
          </sc.UpperSection>
        </sc.HeaderWrapper>

        <Layout>
          {orderedItems.map(c => (
            <div key={c.category?.id ?? 'Uncategorised'}>
              <sc.ListHeadingWrapper>
                <ListHeading
                  withBadge
                  badgeColor={c.category?.color}
                  title={c.category?.name ?? 'Uncategorised'}
                  extra={formatCurrency(c.total)}
                  onClick={() => handleSetSelectedCategory(c.id)}
                />
              </sc.ListHeadingWrapper>

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
        </Layout>
      </sc.Wrapper>

      {selectedTransaction && (
        <TransactionFlow transaction={selectedTransaction} exitFlow={() => setSelectedTransactionId(null)} />
      )}
    </>
  )
}

export default Overview
