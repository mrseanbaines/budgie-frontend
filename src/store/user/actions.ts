import { SET_IS_LOGGED_IN, SET_USER } from './constants'

import { User } from './types'

export const setIsLoggedIn = (isLoggedIn: User['isLoggedIn']) => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn,
})

export const setUser = (user: User) => ({
  type: SET_USER,
  user,
})
