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

type ResponseCategory = Omit<Category, 'id'> & { _id: string }

const reducer: Reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        ...state,
        items: action.payload.items.map((item: ResponseCategory) => ({
          id: item._id,
          name: item.name,
          color: item.color,
        })),
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
