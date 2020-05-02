import { Reducer } from 'redux'

import { FETCH_SUCCESS, UPDATE_SUCCESS, FETCH_SUMMARIES_SUCCESS } from './constants'
import { Transaction, TransactionSummary } from './types'

export interface State {
  items: Transaction[]
  total: number
  summaries: TransactionSummary[]
}

const initialState: State = {
  items: [],
  total: 0,
  summaries: [],
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      }
    }

    case FETCH_SUMMARIES_SUCCESS: {
      return {
        ...state,
        summaries: action.payload,
      }
    }

    case UPDATE_SUCCESS: {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }

          return item
        }),
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
