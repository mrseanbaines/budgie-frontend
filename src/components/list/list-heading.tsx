import React from 'react'

import * as s from './list.styles'

export interface Props {
  title: string
  extra?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ListHeading: React.FC<Props> = ({ title, extra, onClick }) => (
  <s.ListHeadingWrapper onClick={onClick}>
    <s.Title>{title}</s.Title>

    {extra && <div>{extra}</div>}
  </s.ListHeadingWrapper>
)

export default ListHeading
