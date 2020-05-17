import { Reducer } from 'redux'

import { SET_ERRORS, CLEAR_ERRORS } from './constants'

export interface State {
  message: object
  status: number | null
  id: string | null
}

const initialState: State = {
  message: {},
  status: null,
  id: null,
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS: {
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      }
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        message: {},
        status: null,
        id: null,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
