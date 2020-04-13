import React from 'react'

import * as s from './list.styles'

export interface Props {
  badgeColor: string
  title: string
  extra?: React.ReactNode
}

const ListItem: React.FC<Props> = ({ badgeColor, title, extra }) => (
  <s.ListItemWrapper>
    <s.Badge badgeColor={badgeColor} />
    <s.Title>{title}</s.Title>

    {extra && <div>{extra}</div>}
  </s.ListItemWrapper>
)

export default ListItem
