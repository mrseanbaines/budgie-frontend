import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

import { ChartIcon, ListIcon, StackIcon, UserIcon } from 'icons'

import * as s from './navigation.styles'

const Link: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <NavLink activeClassName='active' exact {...props}>
    {children}
  </NavLink>
)

const Navigation: React.FC = () => (
  <s.Wrapper>
    <Link to='/'>
      <ListIcon />
    </Link>
    <Link to='/overview'>
      <ChartIcon />
    </Link>
    <Link to='/categories'>
      <StackIcon />
    </Link>
    <Link to='/profile'>
      <UserIcon />
    </Link>
  </s.Wrapper>
)

export default Navigation
