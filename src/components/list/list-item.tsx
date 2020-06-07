import React from 'react'

import * as s from './list.styles'

export interface Props {
  badgeColor?: string
  title: string
  extra?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  highlight?: boolean
}

const ListItem: React.FC<Props> = ({ badgeColor, title, extra, onClick, highlight }) => (
  <s.ListItemWrapperBtn onClick={onClick} highlight={highlight}>
    <s.ListItemWrapper>
      <s.Badge badgeColor={badgeColor} />
      <s.Title>{title}</s.Title>

      {extra && <s.Extra>{extra}</s.Extra>}
    </s.ListItemWrapper>
  </s.ListItemWrapperBtn>
)

export default ListItem
