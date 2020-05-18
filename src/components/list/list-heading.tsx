import React from 'react'

import * as s from './list.styles'

export interface Props {
  withBadge?: boolean
  badgeColor?: string
  title: string
  extra?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ListHeading: React.FC<Props> = ({ withBadge, badgeColor, title, extra, onClick }) => (
  <s.ListHeadingWrapper onClick={onClick}>
    <div>
      {withBadge && <s.Badge badgeColor={badgeColor} small />}
      <s.Title>{title}</s.Title>
    </div>

    {extra && <div>{extra}</div>}
  </s.ListHeadingWrapper>
)

export default ListHeading
