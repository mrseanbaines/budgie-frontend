import { useState, useEffect } from 'react'
import ky from 'ky'

import { Transaction } from 'types'

interface Transactions {
  items: Transaction[]
  total: number
}

interface Args {
  query: string
}

const useTransactions = ({ query }: Args) => {
  const [error, setError] = useState<any>(null)
  const [transactions, setTransactions] = useState<Transactions | null>(null)

  useEffect(() => {
    try {
      const accessToken = sessionStorage.getItem('token')

      const getTransactions = async () => {
        const { REACT_APP_API_URL } = process.env

        const response = await ky.get(`${REACT_APP_API_URL}/transactions?${query}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const json = await response.json()

        if (response.status !== 200) {
          setError(json.message)
          return
        }

        setTransactions(json)
      }

      getTransactions()
    } catch (error) {
      throw new Error(error)
    }
  }, [query])

  return [error, transactions]
}

export default useTransactions
