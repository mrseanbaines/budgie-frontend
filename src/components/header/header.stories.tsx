import React from 'react'

import Header from './header'

export default {
  title: 'Header',
}

export const Default = () => <Header title='Transactions' />

export const WithSubtitle = () => <Header title='Transactions' subtitle='April 2020' />
