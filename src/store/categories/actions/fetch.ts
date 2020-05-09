import { Dispatch } from 'redux'
import ky from 'ky'

import { getAuthHeaders } from 'utils'
import { State } from 'store'

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../constants'
import { Category } from '../types'

const { REACT_APP_API_URL } = process.env

const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export interface SuccessPayload {
  category: Category
  total: number
}

const fetchSuccess = (payload: SuccessPayload) => ({
  type: FETCH_SUCCESS,
  payload,
})

const fetchFailure = () => ({
  type: FETCH_FAILURE,
})

const fetchCategories = () => async (dispatch: Dispatch, getState: () => State) => {
  try {
    dispatch(fetchRequest())

    const response = await ky.get(`${REACT_APP_API_URL}/categories`, {
      credentials: 'include',
      headers: getAuthHeaders(getState),
    })
    const json = await response.json()

    dispatch(fetchSuccess(json))
  } catch (error) {
    dispatch(fetchFailure())

    throw new Error(error)
  }
}

export default fetchCategories
