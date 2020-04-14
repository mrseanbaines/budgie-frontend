import React from 'react'

import { ChartIcon, ListIcon, StackIcon, UserIcon } from 'components/icons'
import theme from 'theme'

import * as s from './nav.styles'

const Nav: React.FC = () => (
  <s.Wrapper>
    <a href='/transactions'>
      <ListIcon color={theme.colors.icons.default} />
    </a>
    <a href='/overview'>
      <ChartIcon color={theme.colors.icons.default} />
    </a>
    <a href='/categories'>
      <StackIcon color={theme.colors.icons.default} />
    </a>
    <a href='/profile'>
      <UserIcon color={theme.colors.icons.default} />
    </a>
  </s.Wrapper>
)

export default Nav
