import { combineReducers } from 'redux'

import transactions from './transactions/reducers'
import categories from './categories/reducers'
import auth from './auth/reducers'
import errors from './errors/reducers'
import view from './view/reducers'

export default combineReducers({ transactions, categories, auth, errors, view })
