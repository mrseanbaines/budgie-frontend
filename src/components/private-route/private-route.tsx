import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getIsAuthenticated } from 'store/auth/selectors'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const isAuthenticated = useSelector(getIsAuthenticated)

  return <Route {...props} render={() => (isAuthenticated ? children : <Redirect to='/login' />)} />
}

export default PrivateRoute
