import { Reducer } from 'redux'

import { SET_ACTIVE_DATE } from './constants'

export interface State {
  activeDate: string
}

const initialState: State = {
  activeDate: '',
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DATE: {
      return {
        ...state,
        activeDate: action.date,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
