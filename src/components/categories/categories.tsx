import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCategoryItems } from 'store/categories/selectors'
import { fetchCategories } from 'store/categories/actions'
import { Category } from 'store/categories/types'
import Header from 'components/header'
import Nav from 'components/nav'
import TextInput from 'components/text-input'
import { ListItem } from 'components/list'
import { ForwardIcon } from 'components/icons'
import theme from 'theme'

import * as s from './categories.styles'

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const categories = useSelector(getCategoryItems)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const searchFilter = (category: Category) => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase())
  }

  return (
    <s.Wrapper>
      <Header title='Categories' />

      <s.UpperSection>
        <TextInput
          value={searchQuery}
          placeholder='Search for a merchant'
          onChange={({ target: { value } }) => setSearchQuery(value)}
        />
      </s.UpperSection>

      <s.ScrollableArea>
        <s.Body>
          {categories.filter(searchFilter).map(category => (
            <ListItem
              key={category.id}
              title={category.name}
              badgeColor={category.color}
              extra={<ForwardIcon color={theme.colors.icons.default} />}
            />
          ))}

          <s.NewCategory>New Category</s.NewCategory>
        </s.Body>
      </s.ScrollableArea>

      <Nav />
    </s.Wrapper>
  )
}

export default Categories
