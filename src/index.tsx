import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import * as serviceWorker from 'serviceWorker'
import Transactions from 'components/transactions'
import Overview from 'components/overview'
import store from 'store'

const Index = () => (
  <Provider store={store}>
    <Router>
      <Route path='/:date/transactions' component={Transactions} />
      <Route path='/:date/overview' component={Overview} />
    </Router>
  </Provider>
)

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
