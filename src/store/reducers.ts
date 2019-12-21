import { combineReducers } from 'redux'

import transactions from './transactions/reducers'
import categories from './categories/reducers'

export default combineReducers({ transactions, categories })
