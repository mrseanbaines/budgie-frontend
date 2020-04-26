import React from 'react'

import Transaction from './transaction'
import { transaction } from './mock-data'

export default {
  title: 'Transaction',
}

export const Default = () => <Transaction transaction={transaction} />
