import React from 'react'
import { Provider } from 'react-redux'
import { addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import theme from '../src/theme'
import store from '../src/store'
import GlobalStyles from '../src/styles/global'

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyles />
      {storyFn()}
    </Provider>
  </ThemeProvider>
))
