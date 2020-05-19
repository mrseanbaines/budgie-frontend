import { Reducer } from 'redux'

import { SET_ACTIVE_DATE, SET_SHOW_DATE_SELECT } from './constants'

export interface State {
  activeDate: string
  showDateSelect: boolean
}

const initialState: State = {
  activeDate: '',
  showDateSelect: false,
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DATE: {
      return {
        ...state,
        activeDate: action.date,
      }
    }

    case SET_SHOW_DATE_SELECT: {
      return {
        ...state,
        showDateSelect: action.showDateSelect,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
