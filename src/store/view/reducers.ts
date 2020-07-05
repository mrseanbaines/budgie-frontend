import { Reducer } from 'redux'

import { Category } from 'store/categories/types'

import {
  SET_ACTIVE_DATE,
  SET_SHOW_DATE_SELECT,
  SET_SHOW_FILTERS,
  SET_SELECTED_CATEGORY_ID,
  SET_MIN_AMOUNT,
  SET_MAX_AMOUNT,
} from './constants'

export interface State {
  activeDate: string
  showDateSelect: boolean
  showFilters: boolean
  selectedCategoryId: Category['id'] | null
  minAmount: number | null
  maxAmount: number | null
}

const initialState: State = {
  activeDate: '',
  showDateSelect: false,
  showFilters: false,
  selectedCategoryId: null,
  minAmount: null,
  maxAmount: null,
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

    case SET_MIN_AMOUNT: {
      return {
        ...state,
        minAmount: action.amount,
      }
    }

    case SET_MAX_AMOUNT: {
      return {
        ...state,
        maxAmount: action.amount,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
