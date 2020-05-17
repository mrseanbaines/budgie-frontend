import { Dispatch } from 'redux'

import { State } from 'store'
import { setErrors } from 'store/errors/actions'
import { getAuthHeaders, api } from 'utils'

import { User } from './types'
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from './constants'

const userLoading = () => ({
  type: USER_LOADING,
})

const userLoaded = (user: User) => ({
  type: USER_LOADED,
  user,
})

const authError = () => ({
  type: AUTH_ERROR,
})

interface LoginSuccessPayload {
  token: string
  user: User
}

const loginSuccess = (payload: LoginSuccessPayload) => ({
  type: LOGIN_SUCCESS,
  payload,
})

const loginFail = () => ({
  type: LOGIN_FAIL,
})

export const loadUser = () => async (dispatch: Dispatch, getState: () => State) => {
  try {
    dispatch(userLoading())

    const res = await api.get('auth', { headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(setErrors(data.message, res.status, AUTH_ERROR))
      dispatch(authError())
      return
    }

    dispatch(userLoaded(data))
  } catch (error) {
    console.error(error)
  }
}

interface LoginArgs {
  email: string
  password: string
}

export const login = ({ email, password }: LoginArgs) => async (dispatch: Dispatch, getState: () => State) => {
  try {
    const res = await api.post('auth', { json: { email, password }, headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(setErrors(data.message, res.status, LOGIN_FAIL))
      dispatch(loginFail())
      return
    }

    dispatch(loginSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => ({
  type: LOGOUT_SUCCESS,
})
