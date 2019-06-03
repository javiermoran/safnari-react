import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import * as history from 'history';
import './App.scss';
import HomePage from './components/home/HomePage';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';

const browserHistory = history.createBrowserHistory();

const App = () => (
  <Router history={browserHistory}>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </Router>
);

export default App;
