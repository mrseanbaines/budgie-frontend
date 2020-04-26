import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ChartIcon } from 'icons/chart.svg'
import { ReactComponent as ListIcon } from 'icons/list.svg'
import { ReactComponent as StackIcon } from 'icons/stack.svg'
import { ReactComponent as UserIcon } from 'icons/user.svg'

import * as s from './navigation.styles'

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
