import React from 'react'
import { useDispatch } from 'react-redux'

import { logout } from 'store/auth/actions'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return <button onClick={handleLogout}>Log out</button>
}

export default Profile
