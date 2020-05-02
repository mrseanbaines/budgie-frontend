import React from 'react'

import { ReactComponent as FiltersIcon } from 'icons/filters.svg'
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg'

import * as s from './header.styles'

export interface Props {
  title: string
  subtitle?: string
  withFilters?: boolean
  onFiltersClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  withDateSelect?: boolean
  onDateSelectClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Header: React.FC<Props> = ({
  title,
  subtitle,
  withFilters,
  onFiltersClick,
  withDateSelect,
  onDateSelectClick,
}) => (
  <s.Wrapper>
    {withFilters && (
      <s.Button onClick={onFiltersClick}>
        <FiltersIcon />
      </s.Button>
    )}

    <s.CenterSection>
      <s.Title>{title}</s.Title>
      {subtitle && <s.Subtitle>{subtitle}</s.Subtitle>}
    </s.CenterSection>

    {withDateSelect && (
      <s.Button onClick={onDateSelectClick}>
        <CalendarIcon />
      </s.Button>
    )}
  </s.Wrapper>
)

export default Header
