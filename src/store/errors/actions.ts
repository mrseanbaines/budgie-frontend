import { SET_ERRORS, CLEAR_ERRORS } from './constants'
import { State } from './reducers'

export const setErrors = (message: State['message'], status: State['status'], id: State['id'] = null) => {
  return {
    type: SET_ERRORS,
    payload: { message, status, id },
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}
