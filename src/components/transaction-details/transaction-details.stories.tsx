import React from 'react'

import TransactionDetails from './transaction-details'
import { transaction } from './mock-data'

export default {
  title: 'TransactionDetails',
}

export const Default = () => <TransactionDetails transaction={transaction} />
