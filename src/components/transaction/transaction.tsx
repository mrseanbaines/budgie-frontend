import React from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { ListItem } from 'components/list'
import { getCategoryItems } from 'store/categories/selectors'
import { Transaction as TransactionType } from 'store/transactions/types'
import { formatCurrency } from 'utils'
import { ReactComponent as ForwardIcon } from 'icons/forward.svg'

import * as s from './transaction.styles'

export interface Props {
  transaction: TransactionType
  onCategoryClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Transaction: React.FC<Props> = ({ transaction, onCategoryClick }) => {
  const categories = useSelector(getCategoryItems)
  const category = categories.find(c => c.id === transaction.category)
  const date = new Date(transaction.created)

  return (
    <s.Wrapper>
      <s.Image src={transaction.merchant?.logo} />

      <s.TitleGroup>
        <s.Amount>{formatCurrency(transaction.amount)}</s.Amount>
        <s.Date>{`${format(date, 'EEEE, d MMM')} at ${format(date, 'kk:mm')}`}</s.Date>
        <s.Merchant>{transaction.merchant?.name ?? transaction.counterparty.name}</s.Merchant>
      </s.TitleGroup>

      <ListItem
        title={category?.name ?? 'Uncategorised'}
        badgeColor={category?.color}
        extra={<ForwardIcon />}
        onClick={onCategoryClick}
      />
    </s.Wrapper>
  )
}

export default Transaction
