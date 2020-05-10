import { SET_ACTIVE_DATE } from './constants'

export const setActiveDate = (date: string) => ({
  type: SET_ACTIVE_DATE,
  date,
})
