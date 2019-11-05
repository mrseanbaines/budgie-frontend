import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Accounts from './Accounts';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import './index.css';

const Index = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
