import React from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { List } from 'antd'

import { formatCurrency } from 'utils'
import { Transaction as TransactionType } from 'store/transactions/types'
import { getCategoryItems } from 'store/categories/selectors'

import Category from '../category'

interface Props {
  transaction: TransactionType
}

const Transaction: React.FC<Props> = ({ transaction }) => {
  const categories = useSelector(getCategoryItems)
  const category = categories.find(c => c.id === transaction.category)
  const merchant = typeof transaction.merchant === 'object' ? transaction.merchant.name : transaction.counterparty.name

  return (
    <List.Item>
      <List.Item.Meta title={merchant} description={category && <Category category={category} />} />

      <List.Item.Meta
        title={formatCurrency(transaction.amount)}
        description={format(new Date(transaction.created), 'dd MMM')}
        style={{ flex: 'initial', textAlign: 'right' }}
      />
    </List.Item>
  )
}

export default Transaction
