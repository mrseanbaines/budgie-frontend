import React from 'react'
import { Link } from 'react-router-dom'

import { ChartIcon, ListIcon, StackIcon, UserIcon } from 'components/icons'
import theme from 'theme'

import * as s from './nav.styles'

const Nav: React.FC = () => (
  <s.Wrapper>
    <Link to='/'>
      <ListIcon color={theme.colors.icons.default} />
    </Link>
    <Link to='/overview'>
      <ChartIcon color={theme.colors.icons.default} />
    </Link>
    <Link to='/categories'>
      <StackIcon color={theme.colors.icons.default} />
    </Link>
    <Link to='/profile'>
      <UserIcon color={theme.colors.icons.default} />
    </Link>
  </s.Wrapper>
)

export default Nav
