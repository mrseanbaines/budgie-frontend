import { SET_ACTIVE_DATE, SET_SHOW_DATE_SELECT, SET_SHOW_FILTERS } from './constants'

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
