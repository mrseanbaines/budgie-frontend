import { State } from 'store'

export const getActiveDate = (state: State) => state.view.activeDate

export const getShowDateSelect = (state: State) => state.view.showDateSelect

export const getShowFilters = (state: State) => state.view.showFilters

export const getSelectedCategoryId = (state: State) => state.view.selectedCategoryId

export const getMinAmount = (state: State) => state.view.minAmount

export const getMaxAmount = (state: State) => state.view.maxAmount
