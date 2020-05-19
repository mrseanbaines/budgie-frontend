import { SET_ACTIVE_DATE, SET_SHOW_DATE_SELECT } from './constants'

export const setActiveDate = (date: string) => ({
  type: SET_ACTIVE_DATE,
  date,
})

export const setShowDateSelect = (showDateSelect: boolean) => ({
  type: SET_SHOW_DATE_SELECT,
  showDateSelect,
})
