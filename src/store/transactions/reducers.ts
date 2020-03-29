import { Reducer } from 'redux'

import { FETCH_SUCCESS, UPDATE_SUCCESS } from './constants'
import { Transaction } from './types'

export interface State {
  items: Transaction[]
  total: number
}

const initialState: State = {
  items: [],
  total: 0,
}

type ResponseTransaction = Omit<Transaction, 'id'> & { _id: string }

const reducer: Reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        ...state,
        items: action.payload.items.map((item: ResponseTransaction) => ({
          ...item,
          id: item._id,
        })),
        total: action.payload.total,
      }
    }

    case UPDATE_SUCCESS: {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload._id) {
            return {
              ...action.payload,
              id: action.payload._id,
            }
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
