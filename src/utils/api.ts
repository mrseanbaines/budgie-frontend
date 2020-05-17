import ky from 'ky'

const { REACT_APP_API_URL } = process.env

const api = ky.create({ prefixUrl: REACT_APP_API_URL, throwHttpErrors: false })

export default api
