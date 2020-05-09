import { State } from 'store'

export const getIsAuthenticated = (state: State) => state.auth.isAuthenticated
