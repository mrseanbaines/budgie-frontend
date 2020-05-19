import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DateSelect, { Props as DateSelectProps } from 'components/date-select'
import { setActiveDate, setShowDateSelect } from 'store/view/actions'
import { getShowDateSelect } from 'store/view/selectors'
import { getTransactionsSummaries } from 'store/transactions/selectors'
import { FiltersIcon, CalendarIcon } from 'icons'

import * as s from './header.styles'

export interface Props {
  title: string
  subtitle?: string
  withFilters?: boolean
  onFiltersClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  withDateSelect?: boolean
}

const Header: React.FC<Props> = ({ title, subtitle, withFilters, onFiltersClick, withDateSelect }) => {
  const transactionsSummaries = useSelector(getTransactionsSummaries)
  const showDateSelect = useSelector(getShowDateSelect)
  const dispatch = useDispatch()

  const onDateSelect: DateSelectProps['onDateSelect'] = item => {
    dispatch(setActiveDate(item.date))
    dispatch(setShowDateSelect(false))
  }

  return (
    <>
      <s.Wrapper>
        <div>
          {withFilters && (
            <s.Button onClick={onFiltersClick}>
              <FiltersIcon />
            </s.Button>
          )}
        </div>

        <s.CenterSection>
          <s.Title>{title}</s.Title>
          {subtitle && <s.Subtitle>{subtitle}</s.Subtitle>}
        </s.CenterSection>

        <div>
          {withDateSelect && (
            <s.Button onClick={() => dispatch(setShowDateSelect(!showDateSelect))}>
              <CalendarIcon />
            </s.Button>
          )}
        </div>
      </s.Wrapper>

      {showDateSelect && <DateSelect items={transactionsSummaries} onDateSelect={onDateSelect} />}
    </>
  )
}

export default Header
