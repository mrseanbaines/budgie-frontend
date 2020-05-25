import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'

import DateSelect, { Props as DateSelectProps } from 'components/date-select'
import Filters from 'components/filters'
import { setActiveDate, setShowDateSelect, setShowFilters } from 'store/view/actions'
import { getShowDateSelect, getShowFilters } from 'store/view/selectors'
import { getTransactionsSummaries } from 'store/transactions/selectors'
import { FiltersIcon, CalendarIcon } from 'icons'

import * as s from './header.styles'

export interface Props {
  title: string
  subtitle?: string
  withFilters?: boolean
  withDateSelect?: boolean
}

const Header: React.FC<Props> = ({ title, subtitle, withFilters, withDateSelect }) => {
  const transactionsSummaries = useSelector(getTransactionsSummaries)
  const showDateSelect = useSelector(getShowDateSelect)
  const showFilters = useSelector(getShowFilters)
  const dispatch = useDispatch()
  // const history = useHistory()

  const handleDateSelect: DateSelectProps['onDateSelect'] = item => {
    dispatch(setActiveDate(item.date))
    dispatch(setShowDateSelect(false))
  }

  // const handleFiltersClick = () => {
  //   history.push('/filters')
  // }

  return (
    <>
      <s.Wrapper>
        <div>
          {withFilters && (
            <s.Button onClick={() => dispatch(setShowFilters(!showFilters))}>
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

      {showDateSelect && (
        <DateSelect
          items={transactionsSummaries}
          onDateSelect={handleDateSelect}
          onClickOutside={() => dispatch(setShowDateSelect(false))}
        />
      )}

      {showFilters && <Filters />}
    </>
  )
}

export default Header
