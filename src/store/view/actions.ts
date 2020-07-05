import { Category } from 'store/categories/types'

import {
  SET_ACTIVE_DATE,
  SET_SHOW_DATE_SELECT,
  SET_SHOW_FILTERS,
  SET_SELECTED_CATEGORY_ID,
  SET_MIN_AMOUNT,
  SET_MAX_AMOUNT,
} from './constants'

export const setActiveDate = (date: string) => ({
  type: SET_ACTIVE_DATE,
  date,
})

export const setShowDateSelect = (showDateSelect: boolean) => ({
  type: SET_SHOW_DATE_SELECT,
  showDateSelect,
})

export const setShowFilters = (showFilters: boolean) => ({
  type: SET_SHOW_FILTERS,
  showFilters,
})

export const setSelectedCategoryId = (selectedCategoryId: Category['id'] | null) => ({
  type: SET_SELECTED_CATEGORY_ID,
  selectedCategoryId,
})

export const setMinAmount = (amount: number | null) => ({
  type: SET_MIN_AMOUNT,
  amount,
})

export const setMaxAmount = (amount: number | null) => ({
  type: SET_MAX_AMOUNT,
  amount,
})
