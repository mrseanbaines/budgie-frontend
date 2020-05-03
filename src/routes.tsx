import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'

import Transactions from 'components/transactions'
import Categories from 'components/categories'
import Profile from 'components/profile'
import Login from 'components/login'
import { setIsLoggedIn } from 'store/user/actions'
import { getUser } from 'store/user/selectors'

const Routes = () => {
  const { isLoggedIn } = useSelector(getUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = Cookies.get('access_token')

    if (accessToken) {
      dispatch(setIsLoggedIn(true))
    } else {
      dispatch(setIsLoggedIn(false))
    }
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />

        {isLoggedIn ? (
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
