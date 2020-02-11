import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTransactions } from 'store/transactions/actions'
import { getTransactionItems } from 'store/transactions/selectors'

const useTransactions = (fromDate: string) => {
  const transactions = useSelector(getTransactionItems)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions(fromDate))
  }, [fromDate, dispatch])

  return transactions
}

export default useTransactions
