import React from 'react'
import { useDispatch } from 'react-redux'

import Layout from 'components/layout'
import Header from 'components/header'
import { logout } from 'store/auth/actions'
import * as sc from 'styles/common'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <sc.Wrapper>
      <sc.HeaderWrapper>
        <Header title='Profile' />
      </sc.HeaderWrapper>

      <Layout>
        <button onClick={handleLogout}>Log out</button>
      </Layout>
    </sc.Wrapper>
  )
}

export default Profile
