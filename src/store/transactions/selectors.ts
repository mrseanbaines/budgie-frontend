import { State } from 'store'

export const getTransactionItems = (state: State) => state.transactions.items

export const getTransactionsSummaries = (state: State) => state.transactions.summaries
