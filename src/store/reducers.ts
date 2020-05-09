import { combineReducers } from 'redux'

import transactions from './transactions/reducers'
import categories from './categories/reducers'
import user from './user/reducers'
import auth from './auth/reducers'
import errors from './errors/reducers'

export default combineReducers({ transactions, categories, user, auth, errors })
