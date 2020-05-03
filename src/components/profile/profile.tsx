import React from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { setIsLoggedIn } from 'store/user/actions'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  const logout = () => {
    Cookies.remove('access_token')
    dispatch(setIsLoggedIn(false))
  }

  return <button onClick={logout}>Log out</button>
}

export default Profile
