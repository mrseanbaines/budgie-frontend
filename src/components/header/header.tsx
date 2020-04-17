import React from 'react'

import { FiltersIcon, CalendarIcon } from 'components/icons'
import theme from 'theme'

import * as s from './header.styles'

interface Props {
  title: string
  subtitle?: string
  onFiltersClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCalendarClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Nav: React.FC<Props> = ({ title, subtitle, onFiltersClick, onCalendarClick }) => (
  <s.Wrapper>
    <s.Button onClick={onFiltersClick}>
      <FiltersIcon color={theme.colors.icons.default} />
    </s.Button>

    <div>
      <s.Title>{title}</s.Title>
      {subtitle && <s.Subtitle>{subtitle}</s.Subtitle>}
    </div>

    <s.Button onClick={onCalendarClick}>
      <CalendarIcon color={theme.colors.icons.default} />
    </s.Button>
  </s.Wrapper>
)

export default Nav
