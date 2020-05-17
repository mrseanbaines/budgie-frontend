import { Dispatch } from 'redux'

import { State } from 'store'
import { getAuthHeaders, api } from 'utils'

import { CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE } from '../constants'
import { Category } from '../types'

const createRequest = () => ({
  type: CREATE_REQUEST,
})

export interface SuccessPayload {
  category: Category
  total: number
}

const createSuccess = (payload: SuccessPayload) => ({
  type: CREATE_SUCCESS,
  payload,
})

const createFailure = () => ({
  type: CREATE_FAILURE,
})

export interface Args {
  name: string
  color: string
}

const createCategory = ({ name, color }: Args) => async (
  dispatch: Dispatch,
  getState: () => State,
): Promise<Category | undefined> => {
  try {
    dispatch(createRequest())

    const res = await api.post('categories', { json: { name, color }, headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(createFailure())
      return
    }

    dispatch(createSuccess(data))

    return data.category
  } catch (error) {
    console.error(error)
  }
}

export default createCategory
