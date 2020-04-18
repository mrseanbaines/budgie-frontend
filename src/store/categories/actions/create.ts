import { Dispatch } from 'redux'
import ky from 'ky'

import { CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE } from '../constants'
import { Category } from '../types'

const { REACT_APP_API_URL } = process.env

const createRequest = () => ({
  type: CREATE_REQUEST,
})

interface SuccessPayload {
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

interface Args {
  name: string
  color: string
}

const createCategory = ({ name, color }: Args) => async (dispatch: Dispatch): Promise<Category> => {
  try {
    dispatch(createRequest())

    const response = await ky.post(`${REACT_APP_API_URL}/categories`, {
      json: { name, color },
    })
    const data = await response.json()

    dispatch(createSuccess(data))

    return data.category
  } catch (error) {
    dispatch(createFailure())

    throw new Error(error)
  }
}

export default createCategory
