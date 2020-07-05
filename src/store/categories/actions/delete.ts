import { Dispatch } from 'redux'

import { getAuthHeaders, api } from 'utils'
import { State } from 'store'

import { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } from '../constants'
import { Category } from '../types'

const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

const deleteSuccess = (payload: Category) => ({
  type: DELETE_SUCCESS,
  payload,
})

const deleteFailure = () => ({
  type: DELETE_FAILURE,
})

export interface Args {
  name?: string
  color?: string
}

const deleteCategory = (id: Category['id']) => async (dispatch: Dispatch, getState: () => State) => {
  try {
    dispatch(deleteRequest())

    const res = await api.delete(`categories/${id}`, { headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(deleteFailure())
      return
    }

    dispatch(deleteSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

export default deleteCategory
