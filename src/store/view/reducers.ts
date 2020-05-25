import { Reducer } from 'redux'

import { SET_ACTIVE_DATE, SET_SHOW_DATE_SELECT, SET_SHOW_FILTERS } from './constants'

export interface State {
  activeDate: string
  showDateSelect: boolean
  showFilters: boolean
}

const initialState: State = {
  activeDate: '',
  showDateSelect: false,
  showFilters: false,
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
        showFilters: false,
        showDateSelect: action.showDateSelect,
      }
    }

    case SET_SHOW_FILTERS: {
      return {
        ...state,
        showDateSelect: false,
        showFilters: action.showFilters,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
