import { State } from 'store'

const getAuthHeaders = (getState: () => State) => {
  const accessToken = getState().auth.token
  const headers = new Headers()

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`)
  }

  return headers
}

export default getAuthHeaders
