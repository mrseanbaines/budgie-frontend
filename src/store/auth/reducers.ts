import { Reducer } from 'redux'

import { User } from './types'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './constants'

export interface State {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
}

const initialState: State = {
  token: localStorage.getItem('access_token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case USER_LOADED: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      localStorage.setItem('access_token', action.payload.token)

      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      }
    }

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL: {
      localStorage.removeItem('access_token')

      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
