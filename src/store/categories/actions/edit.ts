import { Dispatch } from 'redux'

import { getAuthHeaders, api } from 'utils'
import { State } from 'store'

import { EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from '../constants'
import { Category } from '../types'

const editRequest = () => ({
  type: EDIT_REQUEST,
})

const editSuccess = (payload: Category) => ({
  type: EDIT_SUCCESS,
  payload,
})

const editFailure = () => ({
  type: EDIT_FAILURE,
})

export interface Args {
  name?: string
  color?: string
}

const editCategory = (id: Category['id'], body: Args) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<Category | undefined> => {
  try {
    dispatch(editRequest())

    const res = await api.put(`categories/${id}`, { json: body, headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(editFailure())
      return
    }

    dispatch(editSuccess(data))

    return data.category
  } catch (error) {
    console.error(error)
  }
}

export default editCategory
