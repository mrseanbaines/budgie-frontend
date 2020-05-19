import { State } from 'store'

export const getActiveDate = (state: State) => state.view.activeDate

export const getShowDateSelect = (state: State) => state.view.showDateSelect
