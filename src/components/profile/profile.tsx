import React from 'react'
import { useDispatch } from 'react-redux'

import Layout from 'components/layout'
import Header from 'components/header'
import { logout } from 'store/auth/actions'
import * as s from 'styles/common'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <s.Wrapper>
      <s.HeaderWrapper>
        <Header title='Profile' />
      </s.HeaderWrapper>

      <Layout>
        <button onClick={handleLogout}>Log out</button>
      </Layout>
    </s.Wrapper>
  )
}

export default Profile
