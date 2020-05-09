import { GET_ERRORS, CLEAR_ERRORS } from './constants'

import { State } from './reducers'

export const getErrors = (msg: State['msg'], status: State['status'], id: State['id'] = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}
