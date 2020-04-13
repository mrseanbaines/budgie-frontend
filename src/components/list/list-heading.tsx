import React from 'react'

import * as s from './list.styles'

export interface Props {
  title: string
  extra?: React.ReactNode
}

const ListHeading: React.FC<Props> = ({ title, extra }) => (
  <>
    <s.ListHeadingWrapper>
      <s.Title>{title}</s.Title>

      {extra && <div>{extra}</div>}
    </s.ListHeadingWrapper>

    <s.Border />
  </>
)

export default ListHeading
