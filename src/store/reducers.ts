import { combineReducers } from 'redux'

import transactions from './transactions/reducers'
import categories from './categories/reducers'
import user from './user/reducers'

export default combineReducers({ transactions, categories, user })
