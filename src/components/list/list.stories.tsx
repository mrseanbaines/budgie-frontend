import React from 'react'

import ListItem from './list-item'
import ListHeading from './list-heading'
import { transactions } from './mock-data'

export default {
  title: 'List',
}

export const Default = () =>
  transactions.map(day => (
    <>
      <ListHeading title={day.date} extra={day.total} />

      {day.transactions.map(transaction => (
        <ListItem badgeColor={transaction.category?.color} title={transaction.merchant} extra={transaction.amount} />
      ))}
    </>
  ))
