import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from 'components/private-route'
import Transactions from 'components/transactions'
import Categories from 'components/categories'
import Profile from 'components/profile'
import Login from 'components/login'
import Overview from 'components/overview'

const Routes = () => (
  <Router>
    <Switch>
      <PrivateRoute path='/' exact>
        <Transactions />
      </PrivateRoute>
      <PrivateRoute path='/categories'>
        <Categories />
      </PrivateRoute>
      <PrivateRoute path='/profile'>
        <Profile />
      </PrivateRoute>
      <PrivateRoute path='/overview'>
        <Overview />
      </PrivateRoute>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  </Router>
)

export default Routes
