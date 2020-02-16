import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import * as serviceWorker from 'serviceWorker'
import Transactions from 'components/transactions'
import Overview from 'components/overview'
import Month from 'components/month'
import Account from 'components/account'
import Accounts from 'components/accounts'
import Login from 'components/login'
import App from 'components/app'
import store from 'store'

const Index = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/accounts/:id/:date/transactions' component={Transactions} />
        <Route path='/accounts/:id/:date/overview' component={Overview} />
        <Route path='/accounts/:id/:date' component={Month} />
        <Route path='/accounts/:id' component={Account} />
        <Route path='/accounts' component={Accounts} />
        <Route path='/login' component={Login} />
        <Route path='/' component={App} />
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
