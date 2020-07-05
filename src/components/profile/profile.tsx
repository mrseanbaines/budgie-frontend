import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'components/layout'
import Header from 'components/header'
import { logout } from 'store/auth/actions'
import { getUser } from 'store/auth/selectors'
import * as sc from 'styles/common'
import * as s from './profile.styles'

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <sc.Wrapper>
      <sc.HeaderWrapper>
        <Header title='Profile' />
      </sc.HeaderWrapper>

      <sc.UpperSection>
        <s.Details>{user?.name}</s.Details>
        <s.Details>{user?.email}</s.Details>

        <hr />
        <s.Meta>Budgie v0.0.0</s.Meta>
      </sc.UpperSection>

      <Layout>
        <hr />

        <sc.TextButton onClick={handleLogout}>Log out</sc.TextButton>
      </Layout>
    </sc.Wrapper>
  )
}

export default Profile
