import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

export type State = ReturnType<typeof rootReducer>

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
  collapsed: true,
  duration: true,
  timestamp: false,
})

const middleware = [thunk, logger]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store
