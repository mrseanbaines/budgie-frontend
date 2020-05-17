import { Dispatch } from 'redux'

import { getAuthHeaders, api } from 'utils'
import { State } from 'store'

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../constants'
import { Category } from '../types'

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

    const res = await api.get('categories', { headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(fetchFailure())
      return
    }

    dispatch(fetchSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

export default fetchCategories
