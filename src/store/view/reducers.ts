import { Reducer } from 'redux'

import { Category } from 'store/categories/types'

import { SET_ACTIVE_DATE, SET_SHOW_DATE_SELECT, SET_SHOW_FILTERS, SET_SELECTED_CATEGORY_ID } from './constants'

export interface State {
  activeDate: string
  showDateSelect: boolean
  showFilters: boolean
  selectedCategoryId: Category['id'] | null
}

const initialState: State = {
  activeDate: '',
  showDateSelect: false,
  showFilters: false,
  selectedCategoryId: null,
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DATE: {
      return {
        ...state,
        selectedCategoryId: null,
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

    case SET_SELECTED_CATEGORY_ID: {
      return {
        ...state,
        selectedCategoryId: action.selectedCategoryId,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
