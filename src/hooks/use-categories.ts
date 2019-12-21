import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCategories } from 'store/categories/actions'
import { getCategoryItems } from 'store/categories/selectors'

const useCategories = () => {
  const categories = useSelector(getCategoryItems)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return categories
}

export default useCategories
