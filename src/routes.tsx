import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Transactions from 'components/transactions'
import Categories from 'components/categories'
import Profile from 'components/profile'
import Login from 'components/login'
import { loadUser } from 'store/auth/actions'
import { getIsAuthenticated } from 'store/auth/selectors'

const Routes = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />

        {isAuthenticated ? (
          <>
            <Route path='/' exact component={Transactions} />
            <Route path='/categories' component={Categories} />
            <Route path='/profile' component={Profile} />
          </>
        ) : (
          <Redirect to='/login' />
        )}
      </Switch>
    </Router>
  )
}

export default Routes
