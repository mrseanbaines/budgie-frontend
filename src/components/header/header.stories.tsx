import React from 'react'

import Header from './header'

export default {
  title: 'Header',
}

export const Default = () => <Header title='Transactions' />

export const WithSubtitle = () => <Header title='Transactions' subtitle='April 2020' />

export const WithFilters = () => <Header title='Transactions' withFilters />

export const WithDateSelect = () => <Header title='Transactions' withDateSelect />

export const WithFiltersAndDateSelect = () => <Header title='Transactions' withFilters withDateSelect />
