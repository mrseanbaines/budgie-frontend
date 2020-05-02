import React from 'react'
import { format } from 'date-fns'
import * as R from 'ramda'

import { formatCurrency } from 'utils'

import * as s from './date-select.styles'

export interface Item {
  date: string
  total: number
}

export interface Props {
  items: Item[]
  onDateSelect?: (item: Item) => void
}

const DateSelect: React.FC<Props> = ({ items, onDateSelect }) => {
  const orderedItems = R.sort(R.descend(R.prop('date')), items)

  return (
    <s.Wrapper>
      {orderedItems.map(item => (
        <s.DateGroup key={item.date} onClick={() => onDateSelect?.(item)}>
          <s.Date>{format(new Date(item.date), 'MMM yy')}</s.Date>
          <s.Total>{formatCurrency(item.total)}</s.Total>
        </s.DateGroup>
      ))}
    </s.Wrapper>
  )
}

export default DateSelect
