import { State } from 'store'

export const getIsAuthenticated = (state: State) => state.auth.isAuthenticated

export const getUser = (state: State) => state.auth.user
