import React from 'react'

import DateSelect from './date-select'

export default {
  title: 'DateSelect',
}

const items = [
  { date: '2020-04-01', total: -96847 },
  { date: '2020-03-01', total: -99281 },
  { date: '2020-02-01', total: -101433 },
  { date: '2020-01-01', total: -89987 },
  { date: '2019-12-01', total: -97655 },
  { date: '2019-11-01', total: -100124 },
]

export const Default = () => <DateSelect items={items} />
