import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { State as TransactionsState } from './transactions/reducers'

export interface State {
  transactions: TransactionsState
}

export type StateWithTransactions = Pick<State, 'transactions'>

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
  collapsed: true,
  duration: true,
  timestamp: false,
})

const middleware = [thunk, logger]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store
