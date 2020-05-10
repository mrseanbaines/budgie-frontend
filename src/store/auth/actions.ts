import { Dispatch } from 'redux'
import ky from 'ky'

import { State } from 'store'
import { getErrors } from 'store/errors/actions'
import { getAuthHeaders } from 'utils'

import { User } from './types'

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from './constants'

const { REACT_APP_API_URL } = process.env

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

const loginError = () => ({
  type: LOGIN_FAIL,
})

export const loadUser = () => async (dispatch: Dispatch, getState: () => State) => {
  try {
    dispatch(userLoading())

    const data = await ky.get(`${REACT_APP_API_URL}/auth`, { headers: getAuthHeaders(getState) }).json<User>()

    dispatch(userLoaded(data))
  } catch (error) {
    const response = await error.response.json()

    dispatch(getErrors(response.message, error.response.status))
    dispatch(authError())

    console.error(error)
  }
}

interface LoginArgs {
  email: string
  password: string
}

export const login = ({ email, password }: LoginArgs) => async (dispatch: Dispatch) => {
  try {
    interface Response {
      token: string
      user: User
    }

    const data = await ky
      .post(`${REACT_APP_API_URL}/auth`, {
        json: { email, password },
        credentials: 'include',
      })
      .json<Response>()

    dispatch(loginSuccess(data))
  } catch (error) {
    const response = await error.response.json()

    dispatch(getErrors(response.message, error.response.status))
    dispatch(loginError())

    console.error(error)
  }
}

export const logout = () => ({
  type: LOGOUT_SUCCESS,
})
