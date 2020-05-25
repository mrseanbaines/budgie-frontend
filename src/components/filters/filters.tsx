import React from 'react'
import { useSelector } from 'react-redux'
import { ListItem, ListHeading } from 'components/list'
import { getCategoryItems } from 'store/categories/selectors'
import { ForwardIcon } from 'icons'

import * as s from './filters.styles'

const Filters: React.FC = () => {
  const categories = useSelector(getCategoryItems)

  return (
    <s.Wrapper>
      <ListHeading title='Categories' />

      {categories.map(category => (
        <ListItem key={category.id} title={category.name} badgeColor={category.color} extra={<ForwardIcon />} />
      ))}
    </s.Wrapper>
  )
}

export default Filters
