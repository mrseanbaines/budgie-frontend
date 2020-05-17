import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { max } from 'date-fns'

import Transactions from 'components/transactions'
import Categories from 'components/categories'
import Profile from 'components/profile'
import Login from 'components/login'
import Overview from 'components/overview'
import PrivateRoute from 'components/private-route'
import { loadUser } from 'store/auth/actions'
import { getIsAuthenticated } from 'store/auth/selectors'
import { fetchCategories } from 'store/categories/actions'
import { fetchTransactions, fetchTransactionsSummaries } from 'store/transactions/actions'
import { getTransactionsSummaries } from 'store/transactions/selectors'
import { setActiveDate } from 'store/view/actions'
import { getActiveDate } from 'store/view/selectors'

const Routes = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const transactionsSummaries = useSelector(getTransactionsSummaries)
  const activeDate = useSelector(getActiveDate)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())

    if (isAuthenticated) {
      dispatch(fetchTransactionsSummaries())
      dispatch(fetchCategories())
    }
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && activeDate) {
      dispatch(fetchTransactions(activeDate))
    }
  }, [dispatch, activeDate, isAuthenticated])

  useEffect(() => {
    if (transactionsSummaries.length) {
      const latestDate = max(transactionsSummaries.map(t => new Date(t.date)))

      dispatch(setActiveDate(latestDate.toISOString()))
    }
  }, [dispatch, transactionsSummaries])

  return (
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
}

export default Routes
