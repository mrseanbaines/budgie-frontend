import { Dispatch } from 'redux'
import ky from 'ky'

import { EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from '../constants'
import { Category } from '../types'

const { REACT_APP_API_URL } = process.env

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

const editCategory = (id: Category['id'], body: Args) => async (dispatch: Dispatch): Promise<Category> => {
  try {
    dispatch(editRequest())

    const response = await ky.put(`${REACT_APP_API_URL}/categories/${id}`, {
      json: body,
      credentials: 'include',
    })
    const data = await response.json()

    dispatch(editSuccess(data))

    return data.category
  } catch (error) {
    dispatch(editFailure())

    throw new Error(error)
  }
}

export default editCategory
