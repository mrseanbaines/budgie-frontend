import React from 'react'

import Navigation from 'components/navigation'

import * as s from './layout.styles'

const Layout: React.FC = ({ children }) => (
  <>
    <s.ScrollableArea>
      <s.Body>{children}</s.Body>
    </s.ScrollableArea>

    <s.NavigationWrapper>
      <Navigation />
    </s.NavigationWrapper>
  </>
)

export default Layout
