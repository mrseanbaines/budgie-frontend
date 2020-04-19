import React from 'react'

import { FiltersIcon, CalendarIcon } from 'components/icons'
import theme from 'theme'

import * as s from './header.styles'

export interface Props {
  title: string
  subtitle?: string
  onFiltersClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCalendarClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  withFilters?: boolean
  withDateSelect?: boolean
}

const Nav: React.FC<Props> = ({ title, subtitle, onFiltersClick, onCalendarClick, withFilters, withDateSelect }) => (
  <s.Wrapper>
    {withFilters && (
      <s.Button onClick={onFiltersClick}>
        <FiltersIcon color={theme.colors.icons.default} />
      </s.Button>
    )}

    <s.CenterSection>
      <s.Title>{title}</s.Title>
      {subtitle && <s.Subtitle>{subtitle}</s.Subtitle>}
    </s.CenterSection>

    {withDateSelect && (
      <s.Button onClick={onCalendarClick}>
        <CalendarIcon color={theme.colors.icons.default} />
      </s.Button>
    )}
  </s.Wrapper>
)

export default Nav
