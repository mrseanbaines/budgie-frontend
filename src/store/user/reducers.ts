import { Reducer } from 'redux'

import { SET_IS_LOGGED_IN, SET_USER } from './constants'
import { User } from './types'

const initialState: User = {
  id: '',
  name: '',
  email: '',
  isLoggedIn: false,
}

const reducer: Reducer<User> = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      }
    }

    case SET_USER: {
      return {
        ...state,
        id: action.user.id,
        name: action.user.name,
        email: action.user.email,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
