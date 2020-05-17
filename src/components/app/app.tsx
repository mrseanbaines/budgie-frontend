import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { max } from 'date-fns'

import { loadUser } from 'store/auth/actions'
import { getIsAuthenticated } from 'store/auth/selectors'
import { fetchCategories } from 'store/categories/actions'
import { fetchTransactions, fetchTransactionsSummaries } from 'store/transactions/actions'
import { getTransactionsSummaries } from 'store/transactions/selectors'
import { setActiveDate } from 'store/view/actions'
import { getActiveDate } from 'store/view/selectors'
import Routes from 'routes'

const App = () => {
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

  return <Routes />
}

export default App
