import React from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { getCategoryItems } from 'store/categories/selectors'
import { Transaction } from 'store/transactions/types'
import Popup from 'components/popup'
import { ListItem } from 'components/list'
import { ForwardIcon } from 'components/icons'
import { formatCurrency } from 'utils'
import theme from 'theme'

import * as s from './transaction-details.styles'

interface Props {
  transaction: Transaction
  onLeftButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickOutside?: (e: Event) => void
}

const TransactionDetails: React.FC<Props> = ({ transaction, onLeftButtonClick, onClickOutside }) => {
  const categories = useSelector(getCategoryItems)
  const category = categories.find(c => c.id === transaction.category)
  const date = new Date(transaction.created)

  return (
    <Popup leftButton='close' onLeftButtonClick={onLeftButtonClick} onClickOutside={onClickOutside}>
      <s.Wrapper>
        <s.Image />

        <s.TitleGroup>
          <s.Amount>{formatCurrency(transaction.amount)}</s.Amount>
          <s.Date>{`${format(date, 'EEEE, d MMM')} at ${format(date, 'kk:mm')}`}</s.Date>
          <s.Merchant>{transaction.merchant?.name ?? transaction.counterparty.name}</s.Merchant>
        </s.TitleGroup>

        <ListItem
          title={category?.name ?? 'Uncategorised'}
          badgeColor={category?.color}
          extra={<ForwardIcon color={theme.colors.icons.default} />}
        />
      </s.Wrapper>
    </Popup>
  )
}

export default TransactionDetails
