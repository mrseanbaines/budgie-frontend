import React from 'react'

import * as s from './list.styles'

export interface Props {
  badgeColor?: string
  title: string
  extra?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ListItem: React.FC<Props> = ({ badgeColor, title, extra, onClick }) => (
  <s.ListItemWrapper onClick={onClick}>
    <s.Badge badgeColor={badgeColor} />
    <s.Title>{title}</s.Title>

    {extra && <s.Extra>{extra}</s.Extra>}
  </s.ListItemWrapper>
)

export default ListItem
