import { Reducer } from 'redux'

import { FETCH_SUCCESS, CREATE_SUCCESS } from './constants'
import { Category } from './types'

export interface State {
  items: Category[]
  total: number
}

const initialState: State = {
  items: [],
  total: 0,
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

    case CREATE_SUCCESS: {
      return {
        ...state,
        items: [...state.items, action.payload.category],
        total: action.payload.total,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
