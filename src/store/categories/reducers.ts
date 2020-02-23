import { Reducer } from 'redux'

import {
  FETCH_SUCCESS,
  // UPDATE_SUCCESS
} from './constants'
import { Category } from './types'

export interface State {
  items: Category[]
  total: number
}

const initialState: State = {
  items: [],
  total: 0,
}

const reducer: Reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      }
    }

    // case UPDATE_SUCCESS: {
    //   return {
    //     ...state,
    //     items: state.items.map(item => {
    //       if (item.id === action.payload.id) {
    //         return action.payload
    //       }

    //       return item
    //     }),
    //   }
    // }

    default: {
      return state
    }
  }
}

export default reducer