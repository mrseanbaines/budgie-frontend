import { Reducer } from 'redux'

import { GET_ERRORS, CLEAR_ERRORS } from './constants'

export interface State {
  msg: object
  status: number | null
  id: string | null
}

const initialState: State = {
  msg: {},
  status: null,
  id: null,
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS: {
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      }
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        msg: {},
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
