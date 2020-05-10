import React from 'react'

import * as s from './list.styles'

export interface Props {
  badgeColor?: string
  title: string
  extra?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ListItem: React.FC<Props> = ({ badgeColor, title, extra, onClick }) => (
  <s.ListItemWrapperBtn onClick={onClick}>
    <s.ListItemWrapper>
      <s.Badge badgeColor={badgeColor} />
      <s.Title>{title}</s.Title>

      {extra && <s.Extra>{extra}</s.Extra>}
    </s.ListItemWrapper>
  </s.ListItemWrapperBtn>
)

export default ListItem
