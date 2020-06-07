import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'components/layout'
import TextInput from 'components/text-input'
import Header from 'components/header'
import { ListItem } from 'components/list'
import EditCategoryFlow from 'components/edit-category-flow'
import CreateCategoryFlow from 'components/create-category-flow'
import { getCategoryItems } from 'store/categories/selectors'
import { fetchCategories } from 'store/categories/actions'
import { Category } from 'store/categories/types'
import { ForwardIcon } from 'icons'

import * as s from './categories.styles'

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<Category['id'] | null>(null)
  const [createNewCategory, setCreateNewCategory] = useState(false)
  const categories = useSelector(getCategoryItems)
  const dispatch = useDispatch()
  const selectedCategory = categories.find(c => c.id === selectedCategoryId)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const searchFilter = (category: Category) => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase())
  }

  return (
    <>
      <s.Wrapper>
        <Header title='Categories' />

        <s.UpperSection>
          <TextInput
            type='search'
            value={searchQuery}
            placeholder='Search for a category'
            onChange={({ target: { value } }) => setSearchQuery(value)}
          />
        </s.UpperSection>

        <Layout>
          {categories.filter(searchFilter).map(category => (
            <ListItem
              key={category.id}
              title={category.name}
              badgeColor={category.color}
              extra={<ForwardIcon />}
              onClick={() => setSelectedCategoryId(category.id)}
            />
          ))}

          <s.NewCategory onClick={() => setCreateNewCategory(true)}>New Category</s.NewCategory>
        </Layout>
      </s.Wrapper>

      {selectedCategory && (
        <EditCategoryFlow category={selectedCategory} exitFlow={() => setSelectedCategoryId(null)} />
      )}

      {createNewCategory && <CreateCategoryFlow exitFlow={() => setCreateNewCategory(false)} />}
    </>
  )
}

export default Categories
