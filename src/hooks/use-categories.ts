import { useState, useEffect } from 'react'
import ky from 'ky'

import { Category } from '../types'

interface Categories {
  items: Category[]
  total: number
}

const useCategories = () => {
  const initialState = {
    items: [],
    total: 0,
  }

  const [categories, setCategories] = useState<Categories>(initialState)

  useEffect(() => {
    const getCategories = async () => {
      const { REACT_APP_API_URL } = process.env

      const data = await ky.get(`${REACT_APP_API_URL}/categories`).json<Categories>()

      setCategories(data)
    }

    getCategories()
  }, [])

  return categories
}

export default useCategories
