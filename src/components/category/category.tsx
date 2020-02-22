import React from 'react'
import { Tag } from 'antd'

import { Category as CategoryType } from 'store/categories/types'

interface Props {
  category: CategoryType
}

const Category: React.FC<Props> = ({ category }) => <Tag color={category.color}>{category.name}</Tag>

export default Category
