import React from 'react'

import { ReactComponent as FiltersIcon } from 'icons/filters.svg'
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg'

import * as s from './header.styles'

export interface Props {
  title: string
  subtitle?: string
  onFiltersClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCalendarClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  withFilters?: boolean
  withDateSelect?: boolean
}

const Navigation: React.FC<Props> = ({
  title,
  subtitle,
  onFiltersClick,
  onCalendarClick,
  withFilters,
  withDateSelect,
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
      <s.Button onClick={onCalendarClick}>
        <CalendarIcon />
      </s.Button>
    )}
  </s.Wrapper>
)

export default Navigation
