import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import Transactions from 'components/transactions'
import Categories from 'components/categories'
import Profile from 'components/profile'
import Login from 'components/login'
import Overview from 'components/overview'
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
    const latestDate = R.last(transactionsSummaries)?.date

    if (latestDate) {
      dispatch(setActiveDate(latestDate))
    }
  }, [dispatch, transactionsSummaries])

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />

        {isAuthenticated ? (
          <>
            <Route path='/' exact component={Transactions} />
            <Route path='/categories' component={Categories} />
            <Route path='/profile' component={Profile} />
            <Route path='/overview' component={Overview} />
          </>
        ) : (
          <Redirect to='/login' />
        )}
      </Switch>
    </Router>
  )
}

export default Routes
