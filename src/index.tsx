import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import * as serviceWorker from 'serviceWorker'
import Transactions from 'components/transactions'
import Categories from 'components/categories'
import store from 'store'
import theme from 'theme'
import GlobalStyles from 'styles/global'

const Index = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        <Switch>
          <Route path='/' exact component={Transactions} />
          <Route path='/categories' component={Categories} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
